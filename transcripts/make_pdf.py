"""Turn session-01-claude-code.md into a print-ready HTML conversation (tool calls as one line each).

Usage: python -I make_pdf.py <transcripts-dir>   → writes session-01-conversation.html next to it.
Then print it to PDF with Playwright's Chromium (see make_pdf.cjs).
Handles only the Markdown subset the transcripts use: headings, quotes, lists, tables, fences, inline marks.
"""
import html
import re
import sys

DIR = sys.argv[1]
src = open(f'{DIR}/session-01-claude-code.md', encoding='utf-8').read()

# Each collapsed tool block becomes its one-line summary; the compaction summary is kept in a box.
src = re.sub(r'<details><summary>(🔧[^<]*)</summary>.*?</details>', lambda m: f'\n<<TOOLS>>{m.group(1)}\n', src,
             flags=re.S)
src = re.sub(r'<details><summary>(📋[^<]*)</summary>(.*?)</details>',
             lambda m: f'\n<<BOXSTART>>{m.group(1)}\n{m.group(2)}\n<<BOXEND>>\n', src, flags=re.S)


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'`([^`]+)`', lambda m: f'<code>{m.group(1)}</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*([^*\n]+)\*(?![\w*])', r'<em>\1</em>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', r'<a href="\2">\1</a>', s)
    return s


def blocks(lines):
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]
        if ln.startswith('```'):
            fence = re.match(r'`+', ln).group(0)
            j = i + 1
            while j < len(lines) and not lines[j].startswith(fence):
                j += 1
            out.append('<pre>' + html.escape('\n'.join(lines[i + 1:j])) + '</pre>')
            i = j + 1
        elif ln.startswith('<<TOOLS>>'):
            out.append(f'<p class="tools">{html.escape(ln[9:])}</p>')
            i += 1
        elif ln.startswith('<<BOXSTART>>'):
            j = i + 1
            while j < len(lines) and lines[j] != '<<BOXEND>>':
                j += 1
            out.append(f'<div class="box"><p class="boxtitle">{html.escape(ln[12:])}</p>'
                       + blocks(lines[i + 1:j]) + '</div>')
            i = j + 1
        elif re.match(r'#{1,4} ', ln):
            level = len(ln.split(' ')[0])
            cls = ' class="owner"' if '🧑' in ln else (' class="claude"' if '🤖' in ln else '')
            out.append(f'<h{level}{cls}>{inline(ln[level + 1:])}</h{level}>')
            i += 1
        elif ln.startswith('>'):
            j = i
            while j < len(lines) and lines[j].startswith('>'):
                j += 1
            inner = [re.sub(r'^> ?', '', x) for x in lines[i:j]]
            out.append('<blockquote>' + blocks(inner) + '</blockquote>')
            i = j
        elif ln.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s:|-]+\|$', lines[i + 1].strip()):
            rows = []
            j = i
            while j < len(lines) and lines[j].startswith('|'):
                rows.append([c.strip() for c in lines[j].strip().strip('|').split('|')])
                j += 1
            head, body = rows[0], rows[2:]
            t = '<table><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
            t += ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in body)
            out.append(t + '</tbody></table>')
            i = j
        elif re.match(r'\s*([-*]|\d+\.) ', ln):
            j = i
            items = []
            while j < len(lines) and (re.match(r'\s*([-*]|\d+\.) ', lines[j]) or
                                      (lines[j].startswith('   ') and lines[j].strip())):
                if re.match(r'\s*([-*]|\d+\.) ', lines[j]):
                    depth = (len(lines[j]) - len(lines[j].lstrip())) // 2
                    items.append([depth, re.sub(r'^\s*([-*]|\d+\.) ', '', lines[j])])
                else:
                    items[-1][1] += ' ' + lines[j].strip()
                j += 1
            ordered = bool(re.match(r'\s*\d+\.', ln))
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(
                f'<li style="margin-left:{d * 1.2}em">{inline(t)}</li>' for d, t in items) + f'</{tag}>')
            i = j
        elif ln.strip() in ('---', ''):
            if ln.strip() == '---':
                out.append('<hr>')
            i += 1
        else:
            j = i
            para = []
            while j < len(lines) and lines[j].strip() and not re.match(r'(```|#{1,4} |>|\||<<|\s*([-*]|\d+\.) )',
                                                                        lines[j]):
                para.append(lines[j])
                j += 1
            if not para:  # a line no rule claimed; keep it as text rather than loop forever
                para, j = [ln], i + 1
            out.append('<p>' + inline(' '.join(para)) + '</p>')
            i = j
    return '\n'.join(out)


body = blocks(src.split('\n'))
css = """
@page { size: A4; margin: 16mm 14mm 18mm; }
body { font: 10.5pt/1.45 "Segoe UI", system-ui, sans-serif; color: #1a1f2b; }
h1 { font-size: 18pt; margin: 0 0 6pt; }
h2.owner { font-size: 11.5pt; margin: 16pt 0 4pt; color: #4a2fa8; border-top: 1.5px solid #d9d2f5; padding-top: 8pt; }
h3.claude { font-size: 10.5pt; margin: 10pt 0 4pt; color: #9a3d1d; }
blockquote { margin: 0 0 6pt; padding: 6pt 10pt; background: #f3f0ff; border-left: 3px solid #6a50d3; border-radius: 4px; }
p { margin: 0 0 6pt; } ul, ol { margin: 0 0 6pt; padding-left: 18pt; } li { margin: 1pt 0; }
code { font: 9pt Consolas, monospace; background: #f1f3f6; padding: 0 2pt; border-radius: 2px; }
pre { font: 8.5pt/1.35 Consolas, monospace; background: #f5f7fa; padding: 6pt; border-radius: 4px; white-space: pre-wrap; word-break: break-word; }
table { border-collapse: collapse; margin: 0 0 8pt; font-size: 9.5pt; } th, td { border: 1px solid #cbd2dc; padding: 3pt 6pt; text-align: left; vertical-align: top; }
th { background: #eef1f5; }
p.tools { font-size: 8.5pt; color: #5b6576; margin: 2pt 0 6pt; }
.box { border: 1px solid #cbd2dc; border-radius: 6px; padding: 8pt 10pt; margin: 8pt 0; background: #fafbfc; font-size: 9.5pt; }
.boxtitle { font-weight: 700; } a { color: #4a2fa8; word-break: break-all; } hr { border: 0; border-top: 1px dashed #cbd2dc; margin: 12pt 0; }
h2, h3 { break-after: avoid; } pre, table, blockquote { break-inside: auto; }
"""
note = ('<p class="tools">This PDF is the conversation. Each run of tool work is shown as one line; the full tool '
        'calls and outputs are in <code>session-01-claude-code.md</code> and <code>raw/</code>, and the subagent '
        'runs in <code>subagents/</code>.</p>')
page = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Loan EMI Calculator: development '
        f'transcript</title><style>{css}</style></head><body>{body.replace("</h1>", "</h1>" + note, 1)}</body></html>')
open(f'{DIR}/session-01-conversation.html', 'w', encoding='utf-8', newline='\n').write(page)
print('html bytes', len(page))
