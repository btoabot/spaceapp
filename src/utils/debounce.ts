type DebounceFunction<T extends (...args: any[]) => any> = (
  fn: T,
  delay: number,
) => T;

const debounce: DebounceFunction<(...args: any[]) => void> = (fn, delay) => {
  let timer: number | null = null;

  return function (this: any, ...args: any[]) {
    clearTimeout(timer as number);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export default debounce;
