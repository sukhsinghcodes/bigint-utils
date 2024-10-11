export const BI_POW_18 = BigInt(10 ** 18)

export class BigNumber {
  private _value: bigint
  private _decimals: number

  constructor(value: bigint | string | number, decimals = 18) {
    this._decimals = decimals

    // If bigint we assume that the value is already in the correct format
    if (typeof value === 'bigint') {
      this._value = value
      return
    }

    let val = value.toString()

    const [integerPart, fractionalPart] = val.split('.')
    const precision = this._decimals || fractionalPart?.length || 0

    if (precision > 0) {
      val = `${integerPart}${(fractionalPart || '').padEnd(precision, '0')}`
    }
    this._value = BigInt(val)
  }

  mul(other: BigNumber | bigint | string | number): BigNumber {
    const _other = other instanceof BigNumber ? other.value : BN(other).value

    return new BigNumber((this._value * _other + BI_POW_18 / 2n) / BI_POW_18)
  }

  div(other: BigNumber | bigint | string | number): BigNumber {
    const _other = other instanceof BigNumber ? other.value : BN(other).value

    return new BigNumber((this._value * BI_POW_18 + _other / 2n) / _other)
  }

  public get value(): bigint {
    return this._value
  }

  public toNumber(): number {
    const valStr = this._value.toString()

    if (this._decimals === 0) {
      return Number(valStr)
    }

    const integerPart = valStr.slice(0, -this._decimals) || '0'
    const fractionalPart = valStr
      .slice(-this._decimals)
      .padStart(this._decimals, '0')

    return Number(`${integerPart}.${fractionalPart}`)
  }

  public toFixed(decimals: number): string {
    return this.toNumber().toFixed(decimals)
  }

  public toString(): string {
    return this.toNumber().toString()
  }
}

export function BN(value: bigint | string | number, decimals = 18): BigNumber {
  return new BigNumber(value, decimals)
}
