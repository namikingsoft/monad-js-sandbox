// @flow
import SingleValue from 'utils/SingleValue';
import type { Monad } from 'types/Monad';

export default class List<T> extends SingleValue<Generator<T, void, void>> {

  valueOf(): any {
    return this;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    const items = super.valueOf();
    return new List(function*() {
      for (const item of items) {
        yield transform(item);
      }
    });
  }
}
