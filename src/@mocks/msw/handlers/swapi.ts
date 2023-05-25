import { rest } from 'msw';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockVehiclesResponse } from '../../swApi/vehicles';

const serviceUrl = import.meta.env.VITE_SWAPI_URI;

const handlers = [
  rest.get(`${serviceUrl}/vehicles`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCodes.Ok), ctx.json(mockVehiclesResponse));
  }),
];

export default handlers;
