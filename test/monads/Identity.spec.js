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
});
