import { rest } from 'msw';
import HttpStatusCodes from '../../../@enums/HttpStatusCodes';
import { mockUsers } from '../../jsonApi/users';
import IUser from '../../../@interfaces/jsonApi/IUser';

const serviceUrl = import.meta.env.VITE_JSONAPI_URI;

const handlers = [
  rest.get(`${serviceUrl}/users`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCodes.Ok), ctx.json(mockUsers));
  }),

  rest.get(`${serviceUrl}/users/:id`, (req, res, ctx) => {
    const id = Number(req.params.id);
    const user = mockUsers.find(u => u.id === id);

    return user
      ? res(ctx.status(HttpStatusCodes.Ok), ctx.json(user))
      : res(ctx.status(HttpStatusCodes.NotFound), ctx.json({ error: 'Not found' }));
  }),

  rest.post(`${serviceUrl}/users`, async (req, res, ctx) => {
    const dto: Partial<IUser> = await req.json();

    return res(
      ctx.status(HttpStatusCodes.Created),
      ctx.json({ id: mockUsers.length, ...dto }),
    );
  }),

  rest.put(`${serviceUrl}/users/:id`, async (req, res, ctx) => {
    const id = Number(req.params.id);
    const dto: Partial<IUser> = await req.json();
    const user = mockUsers.find(u => u.id === id);

    return user
      ? res(ctx.status(HttpStatusCodes.Ok), ctx.json({ ...user, ...dto }))
      : res(ctx.status(HttpStatusCodes.NotFound), ctx.json({ error: 'Not found' }));
  }),

  rest.delete(`${serviceUrl}/users/:id`, async (req, res, ctx) => {
    const existing = mockUsers.find(u => u.id === Number(req.params.id));

    return existing
      ? res(ctx.status(HttpStatusCodes.NoContent))
      : res(ctx.status(HttpStatusCodes.NotFound), ctx.json({ error: 'Not found' }));
  }),
];

export default handlers;
