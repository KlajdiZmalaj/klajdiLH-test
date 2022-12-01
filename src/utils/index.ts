// export const checkInclude = (a, b) => `${a}`.toLowerCase().includes(`${b}`.toLowerCase());

export const getSum = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0);
};

export const getWithOldValues = (obj1: any, obj2: any) =>
  Object.entries(obj1).reduce(
    (a: any, b: any) => ({
      ...a,
      [b[0]]: b[1],
      ["old_" + [b[0]]]: obj2[b[0]],
    }),
    {},
  );
