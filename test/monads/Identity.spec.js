// @flow
import assert from 'power-assert';
import Identity from 'monads/Identity';
import doMonad from 'utils/doMonad';

describe('Identity', () => {
  describe('new', () => {
    it('should be return new instance', () => {
      assert(new Identity(1) instanceof Identity);
    });
  });

  describe('toString', () => {
    it('should be return instance string', () => {
      assert(`${new Identity(1)}` === 'Identity(1)');
    });
  });

  describe('bind', () => {
    it('should be return binded instance', () => {
      assert(
        new Identity(1).bind(x =>
          new Identity(`num:${x}`)
        )
        .toString() === 'Identity(num:1)'
      );
      assert(
        new Identity(1).bind(x =>
          new Identity(2).bind(y =>
            new Identity(x + y)
          )
        )
        .toString() === 'Identity(3)'
      );
      assert(
        doMonad(function*() {
          const value1 = yield new Identity(1);
          const value2 = yield new Identity(2);
          return new Identity(value1 + value2);
        }())
        .toString() === 'Identity(3)'
      );
    });
  });

  describe('monad rules', () => {
    function unit<T>(value: T): Identity<T> {
      return new Identity(value);
    }
    it('should be follow the rule 1', () => {
      const f = x => unit(x * 2);
      assert.deepEqual(unit(2).bind(f), f(2));
    });
    it('should be follow the rule 2', () => {
      const m = unit(2);
      assert.deepEqual(m.bind(unit), m);
    });
    it('should be follow the rule 3', () => {
      const m = unit(2);
      const f = x => unit(x * 2);
      const g = x => unit(String(x));
      assert.deepEqual(m.bind(f).bind(g), m.bind(x => f(x).bind(g)));
    });
  });
});
