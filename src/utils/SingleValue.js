class PrivateSingleValue<T> {
  _value: T;

  constructor(value: T) {
    this._value = value;
  }

  valueOf(): T {
    return this._value;
  }

  toString(): string {
    const str = this.constructor.name;
    return str + (this._value !== undefined ? `(${this._value})` : '');
  }

  equals(target: SingleValue<T>): boolean {
    return this.valueOf() === target.valueOf();
  }
}

export default class SingleValue<T> extends PrivateSingleValue<T> {}
