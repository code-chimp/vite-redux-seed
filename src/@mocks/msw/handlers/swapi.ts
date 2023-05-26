import { rest } from 'msw';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockVehicles, mockVehiclesResponse } from '../../swApi/vehicles';

const serviceUrl = import.meta.env.VITE_SWAPI_URI;

const handlers = [
  rest.get(`${serviceUrl}/vehicles`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCodes.Ok), ctx.json(mockVehiclesResponse));
  }),

  rest.get(`${serviceUrl}/vehicles/:id/`, (req, res, ctx) => {
    const id = Number(req.params.id);
    const vehicle = mockVehicles.find(v => v.url === `${serviceUrl}/vehicles/${id}/`);

    return vehicle
      ? res(ctx.status(HttpStatusCodes.Ok), ctx.json({ id, ...vehicle }))
      : res(ctx.status(HttpStatusCodes.NotFound));
  }),
];

export default handlers;
