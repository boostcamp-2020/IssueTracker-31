import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:3000'
    : 'http://127.0.0.1:3000'

const server = setupServer(
  rest.get(`${baseURL}/labels`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [
          {
            id: 1,
            name: 'first label',
            description: 'first label',
            color: '#ed250e',
          },
          {
            id: 2,
            name: 'second label',
            description: 'second label',
            color: '#f58442',
          },
          {
            id: 3,
            name: 'third label',
            description: 'third label',
            color: '#e6f51b',
          },
        ],
      }),
      ctx.status(200),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export default server
