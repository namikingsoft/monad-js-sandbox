// @flow
/* eslint-disable no-unused-vars */

export default class Monad<T> {

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    throw new Error('Unimplemented abstract method: bind');
  }

  static unit<U>(value: U): Monad<U> {
    throw new Error('Unimplemented abstract method: unit');
  }
}

export function doMonad<U>(gen: Generator<Monad<any>, Monad<U>, any>): Monad<U> {
  function step(value: any) {
    const result = gen.next(value);
    if (!result.value) {
      throw new Error();
    }
    if (result.done) {
      return result.value;
    }
    return result.value.bind(step);
  }
  return step();
}
