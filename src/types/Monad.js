// @flow

export interface Monad<T> {
  bind<U>(transform: (value: T) => Monad<U>): Monad<U>;
}

export interface Maybe<T> extends Monad<T> {}
