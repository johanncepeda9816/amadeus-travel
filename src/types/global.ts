export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: string | null;
}
