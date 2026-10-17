import { describe, expect, it } from 'vitest'

describe('time zone', () => {
  it('[SPEC-§12.1] the Asia/Karachi zone is applied on every OS (15:45 UTC is 20:45 local)', () => {
    expect(new Date('2026-10-17T15:45:00Z').getHours()).toBe(20)
    expect(new Date('2026-10-17T15:45:00Z').getMinutes()).toBe(45)
  })
})
