// @flow
import SingleValue from 'utils/SingleValue';
import type { Monad } from 'types/Monad';

export default class List<T> extends SingleValue<() => Generator<T, void, void>> {

  valueOf(): any {
    return this;
  }

  toString(): string {
    return `List(${this.toArray().join(',')})`;
  }

  toArray(): Array<T> {
    const items: Array<T> = [];
    for (const item of super.valueOf()()) {
      items.push(item);
    }
    return items;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    const items = super.valueOf()();
    return new List(function*() {
      for (const item of items) {
        yield* (transform(item): any).toArray();
      }
    });
  }
}
