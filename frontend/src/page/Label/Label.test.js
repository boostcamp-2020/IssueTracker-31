import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import LabelPage from './Label'

test('render Label Page', async () => {
  const { container } = render(<LabelPage />)
  /* TODO-DELETE: labels 요청 테스트 코드. labelpage는 이 데이터를 직접 쓰지 않아서 직접 쓰는 곳으로 옮겨야 함 */
  await waitFor(() => screen.getByText('second', { exact: false }))
  expect(container).toHaveTextContent('second')
  expect(container).toBeInTheDocument()
})
