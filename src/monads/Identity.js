// @flow
import SingleValue from 'utils/SingleValue';

export default class Identity<T> extends SingleValue<T> {

  bind<U>(transform: (value: T) => Identity<U>): Identity<U> {
    return transform(this.valueOf());
  }

  static unit(value: T): Identity<T> {
    return new Identity(value);
  }
}
