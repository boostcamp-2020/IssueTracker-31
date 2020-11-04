import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import LabelPage from './Label'

test('render Label Page', async () => {
  const { container } = render(<LabelPage />)
  await waitFor(() => screen.getByText('second', { exact: false }))

  expect(container).toHaveTextContent('second')
})
