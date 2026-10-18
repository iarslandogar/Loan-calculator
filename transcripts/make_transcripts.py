"""Build readable transcripts and filtered raw logs from Claude Code session logs.

Usage: python -I make_transcripts.py <logs-dir> <session-id> <out-dir>
"""
import datetime as dt
import glob
import json
import os
import re
import sys

LOGS, SID, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
PKT = dt.timezone(dt.timedelta(hours=5))

SECRET_PATTERNS = [
    r'gh[pousr]_[A-Za-z0-9]{30,}', r'github_pat_[A-Za-z0-9_]{40,}', r'sk-ant-[A-Za-z0-9_\-]{20,}',
    r'sk-[A-Za-z0-9]{40,}', r'AKIA[0-9A-Z]{16}', r'[Bb]earer\s+[A-Za-z0-9\-_\.=]{30,}',
    r'-----BEGIN [A-Z ]*PRIVATE KEY-----',
]
REMINDER = re.compile(r'<system-reminder>.*?</system-reminder>', re.S)
IDE_TAGS = re.compile(r'<ide_(opened_file|selection)>.*?</ide_\1>', re.S)
KEEP_RAW_TYPES = {'user', 'assistant', 'system'}


def redact(s):
    for p in SECRET_PATTERNS:
        s = re.sub(p, '[REDACTED]', s)
    return s


UNCLOSED = re.compile(r'<system-reminder>.*', re.S)


def clean(s):
    return redact(UNCLOSED.sub('[system text removed]', REMINDER.sub('', s))).strip()


def when(ts):
    if not ts:
        return ''
    t = dt.datetime.fromisoformat(ts.replace('Z', '+00:00')).astimezone(PKT)
    return t.strftime('%Y-%m-%d %H:%M PKT')


def cut(s, n):
    s = s if isinstance(s, str) else json.dumps(s, ensure_ascii=False, indent=1)
    s = clean(s)
    return s if len(s) <= n else s[:n] + f'\n… [{len(s) - n:,} more characters not shown; see raw/]'


def fence(s, lang=''):
    ticks = '````' if '```' in s else '```'
    return f'{ticks}{lang}\n{s}\n{ticks}'


def load(path):
    with open(path, encoding='utf-8') as f:
        return [json.loads(line) for line in f if line.strip()]


def text_of(content):
    if isinstance(content, str):
        return content
    out = []
    for b in content or []:
        if b.get('type') == 'text':
            out.append(b['text'])
        elif b.get('type') == 'image':
            out.append('[screenshot attached]')
    return '\n'.join(out)


def result_text(block):
    c = block.get('content')
    if isinstance(c, list):
        return '\n'.join(x.get('text', '[image]') if x.get('type') != 'image' else '[image]' for x in c)
    return c or ''


def describe_call(name, inp, agent_links):
    """One tool call as Markdown (inside a collapsed block)."""
    head = f'**{name}**'
    desc = inp.get('description') or inp.get('file_path') or inp.get('pattern') or inp.get('url') or ''
    if desc:
        head += f' · {cut(str(desc), 200)}'
    body = []
    if name in ('Bash', 'PowerShell'):
        body.append(fence(cut(inp.get('command', ''), 2500), 'bash' if name == 'Bash' else 'powershell'))
    elif name == 'Edit':
        body.append('Replace:\n' + fence(cut(inp.get('old_string', ''), 1500)))
        body.append('With:\n' + fence(cut(inp.get('new_string', ''), 1500)))
    elif name == 'Write':
        body.append(fence(cut(inp.get('content', ''), 3000)))
    elif name == 'Agent':
        link = agent_links.get(inp.get('_id'))
        head = f"**Subagent `{inp.get('subagent_type', 'general')}`** · {inp.get('description', '')}"
        if link:
            head += f' → [full subagent transcript]({link})'
        body.append('Brief given to the subagent:\n' + fence(cut(inp.get('prompt', ''), 4000)))
    elif name == 'AskUserQuestion':
        for q in inp.get('questions', []):
            opts = '\n'.join(f"  - **{o.get('label')}**: {o.get('description', '')}" for o in q.get('options', []))
            body.append(f"> **{q.get('question')}**\n{opts}")
    elif name in ('Read', 'Glob', 'Grep', 'TaskStop', 'ToolSearch', 'ScheduleWakeup', 'Skill'):
        body.append(fence(cut({k: v for k, v in inp.items() if k != '_id'}, 600), 'json'))
    else:
        body.append(fence(cut({k: v for k, v in inp.items() if k != '_id'}, 1500), 'json'))
    return head, body


def render(records, title, intro, agent_links, owner_label):
    lines = [f'# {title}', '', intro, '']
    calls = {}
    group = []  # pending tool calls/results, flushed as one collapsed block

    def flush():
        if not group:
            return
        names = [g[0] for g in group if g[0]]
        counts = {}
        for n in names:
            counts[n] = counts.get(n, 0) + 1
        label = ', '.join(f'{n} ×{c}' if c > 1 else n for n, c in counts.items())
        lines.append(f'<details><summary>🔧 {len(names)} tool call(s): {label}</summary>\n')
        for _, md in group:
            lines.append(md)
        lines.append('</details>\n')
        group.clear()

    for r in records:
        t = r.get('type')
        if t == 'system' and r.get('subtype') == 'compact_boundary':
            flush()
            lines += ['---', f'*{when(r.get("timestamp"))}: the conversation reached the context limit and was '
                      'compacted. Claude continued from a written summary, shown next.*', '']
            continue
        if t == 'attachment':
            a = r.get('attachment') or {}
            if a.get('type') == 'queued_command' and (a.get('origin') or {}).get('kind') == 'human':
                prompt = a.get('prompt')
                said = clean(text_of(prompt) if isinstance(prompt, list) else str(prompt or ''))
                if said:
                    flush()
                    lines += [f'## 🧑 {owner_label} · {when(r.get("timestamp"))} *(sent while Claude was working)*',
                              '', '> ' + said.replace('\n', '\n> '), '']
            continue
        if t not in ('user', 'assistant'):
            continue
        msg = r.get('message', {})
        content = msg.get('content')
        if t == 'assistant':
            for b in content if isinstance(content, list) else []:
                if b.get('type') == 'text' and b['text'].strip():
                    flush()
                    lines += [f'### 🤖 Claude · {when(r.get("timestamp"))}', '', clean(b['text']), '']
                elif b.get('type') == 'tool_use':
                    inp = dict(b.get('input') or {})
                    inp['_id'] = b.get('id')
                    head, body = describe_call(b['name'], inp, agent_links)
                    calls[b.get('id')] = b['name']
                    group.append((b['name'], '\n'.join([f'- {head}', ''] + body + [''])))
            continue
        # user records
        if r.get('isCompactSummary'):
            flush()
            lines += ['<details><summary>📋 Summary carried into the next context</summary>', '',
                      cut(text_of(content), 60000), '', '</details>', '']
            continue
        if isinstance(content, list) and any(b.get('type') == 'tool_result' for b in content):
            for b in content:
                if b.get('type') != 'tool_result':
                    continue
                name = calls.get(b.get('tool_use_id'), '')
                limit = 20000 if name == 'AskUserQuestion' else 2500
                res = cut(result_text(b), limit)
                tag = 'Owner\'s answer' if name == 'AskUserQuestion' else 'Result'
                if b.get('is_error'):
                    tag += ' (error)'
                group.append(('', f'  {tag}:\n' + fence(res) + '\n'))
            continue
        if r.get('isMeta'):
            continue
        raw = text_of(content)
        if '<task-notification>' in raw:
            summary = re.search(r'<summary>(.*?)</summary>', raw, re.S)
            group.append(('', f'  ⚙️ Background task finished: {summary.group(1).strip() if summary else ""}\n'))
            continue
        cmd = re.search(r'<command-name>(.*?)</command-name>', raw)
        if cmd:
            args = re.search(r'<command-args>(.*?)</command-args>', raw, re.S)
            raw = f'{cmd.group(1)} {args.group(1).strip() if args else ""}'.strip()
        elif '<local-command-stdout>' in raw or '<local-command-caveat>' in raw:
            continue
        selection = IDE_TAGS.search(raw)
        raw = clean(IDE_TAGS.sub('', raw))
        if not raw:
            continue
        flush()
        lines += [f'## 🧑 {owner_label} · {when(r.get("timestamp"))}', '']
        if selection:
            lines += ['*(had a file open or selected in the editor)*', '']
        lines += ['> ' + raw.replace('\n', '\n> '), '']
    flush()
    return '\n'.join(lines) + '\n'


def strip_strings(o):
    if isinstance(o, str):
        return redact(UNCLOSED.sub('[system text removed]', REMINDER.sub('', o)))
    if isinstance(o, list):
        return [strip_strings(x) for x in o]
    if isinstance(o, dict):
        return {k: strip_strings(v) for k, v in o.items()}
    return o


def write_raw(records, path):
    kept = [strip_strings(r) for r in records if r.get('type') in KEEP_RAW_TYPES]
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        for r in kept:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    return len(kept), len(records)


os.makedirs(f'{OUT}/subagents', exist_ok=True)
os.makedirs(f'{OUT}/raw/subagents', exist_ok=True)

# Subagents first, so the main transcript can link to them. Numbered in start order.
metas = []
for mp in glob.glob(f'{LOGS}/{SID}/subagents/*.meta.json'):
    meta = json.load(open(mp, encoding='utf-8'))
    recs = load(mp.replace('.meta.json', '.jsonl'))
    start = next((r.get('timestamp') for r in recs if r.get('timestamp')), '')
    metas.append((start, mp, meta, recs))
metas.sort()
agent_links, index = {}, []
for i, (start, mp, meta, recs) in enumerate(metas, 1):
    slug = re.sub(r'[^a-z0-9]+', '-', meta.get('description', 'agent').lower()).strip('-')[:50]
    name = f"{i:02d}-{meta.get('agentType', 'agent')}-{slug}"
    agent_links[meta.get('toolUseId')] = f'subagents/{name}.md'
    intro = (f"Subagent **`{meta.get('agentType')}`**, task: *{meta.get('description')}*. Started "
             f"{when(start)}. The first message is the brief the developer (main session) gave it.")
    md = render(recs, f"Subagent {i:02d}: {meta.get('agentType')}: {meta.get('description')}", intro, {},
                'Brief from the developer')
    open(f'{OUT}/subagents/{name}.md', 'w', encoding='utf-8', newline='\n').write(md)
    kept, total = write_raw(recs, f'{OUT}/raw/subagents/{name}.jsonl')
    index.append((name, meta, start, kept, total))

main = load(f'{LOGS}/{SID}.jsonl')
intro = ('One Claude Code session (VS Code extension, Opus 5.5 as the developer) covering the planning phase '
         'through the first deploy. Owner messages are verbatim. Tool calls are collapsed and shortened; '
         'subagent runs link to their own transcripts. See `README.md` in this folder for what was left out.')
md = render(main, 'Session 01: Loan EMI Calculator, Claude Code development session', intro, agent_links,
            'Muhammad Arslan (owner)')
open(f'{OUT}/session-01-claude-code.md', 'w', encoding='utf-8', newline='\n').write(md)
kept, total = write_raw(main, f'{OUT}/raw/session-01-claude-code.jsonl')

stats = {
    'owner_messages': md.count('## 🧑 '), 'claude_replies': md.count('### 🤖 Claude'),
    'tool_calls': sum(1 for r in main if r.get('type') == 'assistant' for b in (r['message'].get('content') or [])
                      if isinstance(b, dict) and b.get('type') == 'tool_use'),
    'compactions': sum(1 for r in main if r.get('type') == 'system' and r.get('subtype') == 'compact_boundary'),
    'first': when(next(r['timestamp'] for r in main if r.get('timestamp'))),
    'last': when([r['timestamp'] for r in main if r.get('timestamp')][-1]),
    'raw_kept': kept, 'raw_total': total,
}
json.dump({'stats': stats, 'subagents': [(n, m, s, k, t) for n, m, s, k, t in index]},
          open(f'{OUT}/.build-info.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1, default=str)
print(json.dumps(stats, indent=1))
for n, m, s, k, t in index:
    print(n, when(s), f'{k}/{t} records kept')
