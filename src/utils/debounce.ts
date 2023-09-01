export const debounce = <T extends Function>(func: T, debounceTime = 500) => {
  let timer: NodeJS.Timeout | null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(null, args);
    }, debounceTime);
  };
};
