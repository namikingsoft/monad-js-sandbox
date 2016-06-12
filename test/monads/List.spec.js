// @flow
import assert from 'power-assert';
import List from 'monads/List';

function* bind(list, transform) {
  for (const item of list) {
    yield* transform(item);
  }
}

describe('List', () => {
  let list1: List<number>;
  let list2: List<number>;

  beforeEach(() => {
    list1 = new List(function*() {
      yield 1;
      yield 2;
      yield 3;
    });
    list2 = new List(function*() {
      for (let i = 0; ; i++) yield i;
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
      assert(list1 instanceof List);
      assert(list2 instanceof List);
    });
  });

  describe('valueOf', () => {
    it('should be return self', () => {
      assert(list1 === list1.valueOf());
      assert(list2 === list2.valueOf());
    });
  });

  describe('toString', () => {
    it('should be return new instance', () => {
      assert(list1.toString() === 'List(1,2,3)');
    });
  });

  describe('bind', () => {
    it('should be return binded instance', () => {
      assert(
        list1.bind(x =>
          new List(function*() {
            yield x;
            yield x + 1;
          })
        ).toString() === 'List(1,2,2,3,3,4)'
      );
    });
  });
});
