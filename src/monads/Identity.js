// @flow
import Monad from 'monads/Monad';

class PrivateIdentity<T> extends Monad<T> {
  _value: T;

  constructor(value: T) {
    super();
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

  static unit<U>(value: U): Monad<U> {
    return new Identity(value);
  }
}
