export type ResultModel<T> =
  | { success: true; result: T }
  | { success: false; result: { error: string } };

export type ResponseModel = {
  success: boolean;
  result?: any;
};
