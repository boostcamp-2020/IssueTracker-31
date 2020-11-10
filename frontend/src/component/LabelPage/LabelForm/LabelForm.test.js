import React from 'react'
import { render } from '@testing-library/react'
import LabelForm from './LabelForm'

it('render label edit form', () => {
  const { container } = render(
    <LabelForm
      id={1}
      name="hello testing"
      color="#ffaaff"
      description="someTest"
    />,
  )
  expect(container).toHaveTextContent('hello testing')
})

it('render label create form', () => {
  const { container } = render(<LabelForm />)
  expect(container).toHaveTextContent('Label preview')
})
