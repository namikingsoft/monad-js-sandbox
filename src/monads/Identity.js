// @flow
import type { Monad } from 'types/Monad';

class PrivateIdentity<T> {
  _value: T;

  constructor(value: T) {
    this._value = value;
  }

  valueOf(): any {
    return this._value;
  }
}

export default class Identity<T> extends PrivateIdentity<T> {

  valueOf(): any {
    return this;
  }

  toString(): string {
    return `Identity(${super.valueOf()})`;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    return transform(super.valueOf());
  }
}
