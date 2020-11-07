import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:3000/api'
    : 'http://127.0.0.1:3000/api'

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
  rest.get(`${baseURL}/milestones`, (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [
          {
            id: 1,
            title: 'title test',
            dueDate: null,
            description: 'description test',
            isOpen: 1,
            openIssue: 1,
            closeIssue: 3,
          },
          {
            id: 2,
            title: 'date test',
            dueDate: '2020-06-05 00:00:00',
            description: null,
            isOpen: 1,
            openIssue: 2,
            closeIssue: 4,
          },
          {
            id: 2,
            title: 'close milestone test',
            dueDate: '2020-11-01 00:00:00',
            description: 'test milestone 3',
            isOpen: 0,
            openIssue: 2,
            closeIssue: 4,
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
