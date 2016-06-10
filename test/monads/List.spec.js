// @flow
import assert from 'power-assert';

function* bind(list, transform) {
  for (var item of list) {
    yield* transform(item);
  }
}

describe('List', () => {
  describe('try', () => {
    it('should be success', () => {
      const result = bind([0, 1, 2], function (x) {
        return bind([0, 1, 2], function* (y) {
          yield x + y;
        });
      });
      let items = [];
      for (var item of result) {
        items.push(item);
      }
      assert.deepEqual(items, [0, 1, 2, 1, 2, 3, 2, 3, 4]);
    });
  });
});
