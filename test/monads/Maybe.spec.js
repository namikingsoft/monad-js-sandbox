// @flow
import assert from 'power-assert';
import doMonad from 'utils/doMonad';
import Just, { Nothing } from 'monads/Maybe';
import type { Maybe } from 'types/Monad';

describe('Maybe', () => {
  describe('new', () => {
    it('should be return new instance', () => {
      assert(new Just(1) instanceof Just);
      assert(Nothing instanceof Nothing.constructor);
    });
  });

  describe('bind', () => {
    class SampleMap<T> {
      map: {[index: string]: T};
      constructor(map: {[index: string]: T}) {
        this.map = map;
      }
      get(key: string): Maybe<T> {
        const value = this.map[key];
        return value ? new Just(value) : Nothing;
      }
    }
    const map: SampleMap<number> = new SampleMap({
      key1: 1,
      key2: 2,
    });
    it('should be return binded instance', () => {
      assert.deepEqual(
        map.get('key1').bind(x =>
          map.get('key2').bind(y =>
            new Just(x + y)
          )
        ),
        new Just(3),
      );
      assert.deepEqual(
        map.get('key1').bind(x =>
          map.get('key3').bind(y =>
            map.get('key2').bind(z =>
              new Just(x + y + z)
            )
          )
        ),
        Nothing,
      );
    });
    it('should be return binded instance using do method', () => {
      assert.deepEqual(
        doMonad(function*() {
          const x = yield map.get('key1');
          const y = yield map.get('key2');
          return new Just(x + y);
        }()),
        new Just(3),
      );
      assert.deepEqual(
        doMonad(function*() {
          const x = yield map.get('key1');
          const y = yield map.get('key3');
          const z = yield map.get('key2');
          return new Just(x + y + z);
        }()),
        Nothing,
      );
    });
  });

  describe('monad rules', () => {
    function unit<T>(value: T): Just<T> {
      return new Just(value);
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
