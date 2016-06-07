// @flow
import assert from 'power-assert';
import doMonad from 'utils/doMonad';
import type { Monad } from 'types/Monad';

describe('doMonad', () => {
  class Sample<T> {
    value: T;
    constructor(value: T) {
      this.value = value;
    }
    bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
      return transform(this.value);
    }
  }
  it('should be throw error because abstract method', () => {
    assert.deepEqual(
      doMonad(function*() {
        const value1 = yield new Sample(1);
        const value2 = yield new Sample(2);
        return new Sample(value1 + value2);
      }()),
      new Sample(3),
    );
  });
});
