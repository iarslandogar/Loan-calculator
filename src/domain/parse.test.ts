import { describe, expect, it } from 'vitest'
import { normaliseAmount, normaliseRate, normaliseTenure } from './parse'

describe('normaliseAmount', () => {
  it.each([
    ['1,000,000', '1000000'],
    ['10,00,000', '1000000'],
    ['1,00,000', '100000'],
    ['1,000.50', '1000.50'],
    ['1,000', '1000'],
    ['12,345', '12345'],
    ['1,00,00,000', '10000000'],
    ['1,000,000,000', '1000000000'],
    ['-1,000', '-1000'],
    ['  1,000,000  ', '1000000'],
    ['1,000.', '1000.'],
  ])('[AC-1.8][SPEC-§4.1] removes valid grouping commas: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })

  it.each([
    ['1,,000'],
    ['1000,50'],
    ['1,5'],
    [',1000'],
    ['10,0000'],
    ['1,000.5,0'],
    ['1,000,00'],
    ['1,0000,000'],
  ])('[AC-2.17][SPEC-§4.1] leaves invalid comma placement in place: %j', (input) => {
    expect(normaliseAmount(input)).toBe(input)
  })

  it.each([
    ['  1000000  ', '1000000'],
    ['\t1000\n', '1000'],
    ['1000000', '1000000'],
    ['abc', 'abc'],
    ['', ''],
    ['   ', ''],
    ['1e6', '1e6'],
  ])('[AC-1.9][SPEC-§4.1] trims whitespace only: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })
})

describe('normaliseRate', () => {
  it.each([
    ['12%', '12'],
    ['  12  ', '12'],
    [' 12% ', '12'],
    ['12 %', '12'],
    ['12.5 % ', '12.5'],
    ['%', ''],
    ['  %  ', ''],
    ['12%%', '12%'],
    ['12', '12'],
    ['', ''],
    ['%12', '%12'],
  ])(
    '[AC-1.10][SPEC-§4.1] normaliseRate(%j) = %j (one trailing percent removed)',
    (input, expected) => {
      expect(normaliseRate(input)).toBe(expected)
    },
  )
})

describe('normaliseTenure', () => {
  it.each([
    ['  1  ', '1'],
    ['\t12\n', '12'],
    ['012', '012'],
    ['2.5', '2.5'],
    ['', ''],
    ['   ', ''],
    ['1,0', '1,0'],
  ])('[AC-1.9][SPEC-§4.1] normaliseTenure(%j) = %j (trim only)', (input, expected) => {
    expect(normaliseTenure(input)).toBe(expected)
  })
})
