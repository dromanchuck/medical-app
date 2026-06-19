export enum ServerErrors {
  None = -1,
  NotFound = 404,
  BadGateway = 502,
  TimeoutGateway = 504,
  Network = 'Network Error',
  Econnaborted = 'ECONNABORTED',
}
