export const successResponse = (msg: string, data: any = {}) => ({
  code: 0,
  msg,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  data,
});

export const errorResponse = (code: number, msg: string) => ({
  code,
  msg,
  data: '',
});
