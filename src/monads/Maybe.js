// @flow
/* eslint-disable no-unused-vars */
import SingleValue from 'utils/SingleValue';
import type { Monad } from 'types/Monad';

export default class Just<T> extends SingleValue<T> {
  valueOf(): any {
    return this;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    return transform(super.valueOf());
  }
}

export const Nothing = (() => {
  class Nothing extends Just<any> {
    constructor() {
      super((undefined: any));
    }

    bind<U>(transform: (value: any) => Monad<U>): Monad<U> {
      return this;
    }
  }
  return new Nothing;
})();
