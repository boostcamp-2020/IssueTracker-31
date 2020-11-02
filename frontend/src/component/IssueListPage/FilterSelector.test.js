import React from 'react'
import { render } from '@testing-library/react'
import FilterSelector from './FilterSelector'

it('Render FilterSelector component', () => {
  const { container } = render(<FilterSelector type="Author" />)
  expect(container).toHaveTextContent('Author')
})

it('No Render FilterSelector component when type is null', () => {
  const { container } = render(<FilterSelector />)
  expect(container).toBeEmptyDOMElement()
})
