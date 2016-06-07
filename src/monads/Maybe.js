// @flow
/* eslint-disable no-unused-vars */
import type { Monad } from 'types/Monad';

export default class Maybe<T> {
  _value: T;

  constructor(value: T) {
    this._value = value;
  }

  toString(): string {
    const str = this.constructor.name;
    return str + (this._value !== undefined ? `(${this._value})` : '');
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    return transform(this._value);
  }
}

export class Just<T> extends Maybe<T> {}
export class Nothing extends Maybe<any> {
  constructor() {
    super((undefined: any));
  }

  bind<U>(transform: (value: any) => Monad<U>): Monad<U> {
    return this;
  }
}
