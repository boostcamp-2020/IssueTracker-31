import React from 'react'
import ReactDOM from 'react-dom'
import { cleanup, render } from '@testing-library/react'
import Button from './Button'
import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <Button name={'New Issue'} selected={undefined} />
    </MemoryRouter>,
    div,
  )
})

it('renders button correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <Button name={'New Issue'} selected={undefined} />
    </MemoryRouter>,
  )
  console.log(container.innerHTML)
  expect(container).toHaveTextContent('New Issue')
})
