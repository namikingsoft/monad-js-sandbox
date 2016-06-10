// @flow
import assert from 'power-assert';

function* bind(list, transform) {
  for (const item of list) {
    yield* transform(item);
  }
}

describe('List', () => {
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
});
