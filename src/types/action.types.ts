export interface ActionWithPayload<T> {
  type: string;
  payload?: T;
  [key: string]: unknown;
}
