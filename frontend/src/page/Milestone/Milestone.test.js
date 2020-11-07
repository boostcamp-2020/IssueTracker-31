import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MilestonePage from './Milestone'

describe('Milestone Page', () => {
  it('Render all component of milestone page', () => {
    const { container } = render(
      <Router>
        <MilestonePage />
      </Router>,
    )
    expect(container).toHaveTextContent('Labels')
    expect(container).toHaveTextContent('Milestones')
    expect(container).toHaveTextContent('New Milestone')
  })
})

// Not working
describe('Milestone component', () => {
  const { container } = render(
    <Router>
      <MilestonePage />
    </Router>,
  )
  it('Render Title', async () => {
    await waitFor(() => screen.getByText('test', { exact: false }))
    expect(container).getAllByText('title test')
    expect(container).getAllByText('description test')
    expect(container).getAllByText('June 05, 2020')
    expect(container).getAllByText('No due date')
  })
})
