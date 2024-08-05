// Edit this file to contain as much data as you want

export enum ResponseCodes {
  BadRequest = 400,
  UnAuthorised = 401,
  Forbidden = 403,
  NotFound = 404,
  RequestTimeOutError = 408,
  ValidationError = 422,

  Redirect = 300,

  ServerError = 500,
  GatewayTimeOut = 502,
  ServerDown = 503,

  Success = 201,
}
