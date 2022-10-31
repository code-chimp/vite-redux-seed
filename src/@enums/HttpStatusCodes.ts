/* eslint-disable no-magic-numbers */
enum HttpStatusCodes {
  Ok = 200,
  Created,
  Accepted,
  NoContent = 204,
  MovedPermanently = 301,
  Redirect,
  BadRequest = 400,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError = 500,
  NotImplemented,
  BadGateway,
}

export default HttpStatusCodes;
