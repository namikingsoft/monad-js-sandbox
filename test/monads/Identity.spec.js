// @flow
import assert from 'power-assert';
import Identity from 'monads/Identity';

function doMonad(gen: Generator<any, any, any>): any {
  function step(value) {
    const result = gen.next(value);
    if (result.done) {
      return result.value;
    }
    return result.value.bind(step);
  }
  return step();
}

describe('Identity', () => {
  describe('new', () => {
    it('should be return new instance', () => {
      assert(new Identity(1) instanceof Identity);
    });
  });

  describe('unit', () => {
    it('should be return new instance', () => {
      assert(Identity.unit(1) instanceof Identity);
    });
  });

  describe('bind', () => {
    it('should be return binded instance', () => {
      assert(
        Identity.unit(1).bind(x =>
          Identity.unit(x.toString())
        )
        .valueOf() === '1'
      );
      assert(
        Identity.unit(1).bind(x =>
          Identity.unit(2).bind(y =>
            Identity.unit(x + y)
          )
        )
        .valueOf() === 3
      );
      assert(
        doMonad(function* gen() {
          const value1 = yield new Identity(1);
          const value2 = yield new Identity(2);
          return new Identity(value1 + value2);
        }())
        .valueOf() === 3
      );
    });
  });

  describe('monad rules', () => {
    it('should be follow the rule 1', () => {
      const f = x => Identity.unit(x * 2);
      assert.deepEqual(Identity.unit(2).bind(f), f(2));
    });
    it('should be follow the rule 2', () => {
      const m = Identity.unit(2);
      assert.deepEqual(m.bind(Identity.unit), m);
    });
    it('should be follow the rule 3', () => {
      const m = Identity.unit(2);
      const f = x => Identity.unit(x * 2);
      const g = x => Identity.unit(String(x));
      assert.deepEqual(m.bind(f).bind(g), m.bind(x => f(x).bind(g)));
    });
  });
});