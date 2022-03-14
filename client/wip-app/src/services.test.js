// import 'whatwg-fetch';
const { rest } = require('msw');
// import { setupWorker } from 'msw';
const { setupServer } = require('msw/node');
const methods = require('./services');

const mockWips = [
  {
    wip_title: 'Art',
    wip_cards: ['Hello', 'wordl'],
    update_request: 'upload better picture',
    update_request_date: 'March 14th',
  },
  {
    wip_title: 'Art2',
    wip_cards: ['Hello', 'wordl'],
    update_request: 'upload better picture pls',
    update_request_date: 'March 16th',
  },
];
// const worker = setupWorker(
const server = setupServer(
  rest.get('http://localhost:3456/wips', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockWips));
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
// worker.start();

describe('Api service getting wips', () => {
  it('intercepts the get request', async () => {
    const result = await methods.getWips();
    expect(result).toEqual(mockWips);
  });
  it('handles failure', async () => {
    server.use(
      rest.get('http://localhost:3456/wips', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    await expect(methods.getWips()).rejects.toThrow(
      'Unexpected end of JSON input'
    );
  });
  it('checks for unhandled routes', async () => {
    rest.get('http://localhost:3456678fhdjskahad/wips', (req, res, ctx) => {
      expect(res.status).toEqual(500);
      // console.log(res);
    });
  });
});
