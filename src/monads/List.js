// @flow
import SingleValue from 'utils/SingleValue';
import type { Monad } from 'types/Monad';

class Getter<T> extends SingleValue<T> {
  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    return transform(this.valueOf());
  }
}

export default class List<T> extends SingleValue<() => Generator<T, void, void>> {

  valueOf(): any {
    return this;
  }

  toString(): string {
    const items: Array<T> = [];
    for (const item of super.valueOf()()) {
      items.push(item);
    }
    return `List(${items.join(',')})`;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    const items = super.valueOf()();
    return new List(function*() {
      for (const item of items) {
        yield transform(item).bind(x => new Getter(x)).valueOf();
      }
    });
  }
}
