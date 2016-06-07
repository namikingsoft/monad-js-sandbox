// @flow
import assert from 'power-assert';
import Monad, { doMonad } from 'monads/Monad';

describe('Monad', () => {
  describe('new', () => {
    it('should be return new instance', () => {
      assert(new Monad instanceof Monad);
    });
  });

  describe('unit', () => {
    it('should be throw error because abstract method', () => {
      assert.throws(() => Monad.unit(1), Error);
    });
  });

  describe('bind', () => {
    it('should be throw error because abstract method', () => {
      assert.throws(() => new Monad().bind(() => new Monad), Error);
    });
  });

  describe('bind', () => {
    class Sample<T> extends Monad<T> {
      value: T;
      constructor(value: T) {
        super();
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
});
