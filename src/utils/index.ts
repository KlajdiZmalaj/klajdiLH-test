// export const checkInclude = (a, b) => `${a}`.toLowerCase().includes(`${b}`.toLowerCase());

export const getSum = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0);
};
