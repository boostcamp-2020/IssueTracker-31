import React from 'react'
import { render } from '@testing-library/react'
import Label from './common/Label'

it('render Issue', () => {
  const { container } = render(<Label name="hello testing" color="#ffaaff" />)
  expect(container).toHaveTextContent('hello testing')
})
