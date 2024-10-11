import { BigNumber, BN } from '.'

describe('bigint-utils', () => {
  it('should initialise with the correct precision', () => {
    const x = new BigNumber('2')
    expect(x.value).toBe(2000000000000000000n)
    expect(x.toString()).toBe('2')
  })

  it('should initialise with the correct precision when decimals are provided', () => {
    const x = new BigNumber('100.123456', 6)
    expect(x.value).toBe(100123456n)
    expect(x.toString()).toBe('100.123456')
  })

  it('should multiply two numbers', () => {
    const result = BN(2).mul(3)
    expect(result.toString()).toBe('6')
  })

  it('should divide two numbers', () => {
    const x = new BigNumber('6')
    const y = new BigNumber('3')
    const result = x.div(y)
    expect(result.toString()).toBe('2')
  })
})
