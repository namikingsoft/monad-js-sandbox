// @flow
import SingleValue from 'utils/SingleValue';
import type { Monad } from 'types/Monad';

export default class Identity<T> extends SingleValue<T> {

  valueOf(): any {
    return this;
  }

  bind<U>(transform: (value: T) => Monad<U>): Monad<U> {
    return transform(super.valueOf());
  }
}
