import { rest } from 'msw';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockUsers } from '../../jsonApi/users';

const serviceUrl = import.meta.env.VITE_JSONAPI_URI;

const handlers = [
  rest.get(`${serviceUrl}/users`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCodes.Ok), ctx.json(mockUsers));
  }),
];

export default handlers;
