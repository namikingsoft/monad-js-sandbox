// @flow
import assert from 'power-assert';
import List from 'monads/List';

function* bind(list, transform) {
  for (const item of list) {
    yield* transform(item);
  }
}

describe('List', () => {
  let list: List<number>;

  beforeEach(() => {
    list = new List(function*() {
      yield 1;
      yield 2;
      yield 3;
    });
  });

  describe('try', () => {
    it('should be success', () => {
      const result = bind([0, 1, 2], (x) =>
        bind([0, 1, 2], function* (y) {
          yield x + y;
        })
      );
      const items = [];
      for (const item of result) {
        items.push(item);
      }
      assert.deepEqual(items, [0, 1, 2, 1, 2, 3, 2, 3, 4]);
    });
  });

  describe('new', () => {
    it('should be return new instance', () => {
      assert(list instanceof List);
    });
  });
});
