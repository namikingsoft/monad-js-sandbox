// @flow
import type { Monad } from 'types/Monad';

export default function doMonad<U>(
  gen: Generator<Monad<any>, Monad<U>, any>
): Monad<U> {
  function step(value: any) {
    const result = gen.next(value);
    if (!result.value) {
      throw new Error();
    }
    if (result.done) {
      return result.value;
    }
    return result.value.bind(step);
  }
  return step();
}
