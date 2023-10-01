import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { ButtonBlue, ButtonProps } from './index'

describe('ButtonBlue', () => {
  it('should render children and trigger onClickCallback', () => {
    const onClickCallback = jest.fn()

    const { getByText } = render(
      <ButtonBlue onClickCallback={onClickCallback}>Click Me</ButtonBlue>
    )

    expect(getByText('Click Me')).toBeInTheDocument()

    fireEvent.click(getByText('Click Me'))

    expect(onClickCallback).toHaveBeenCalled()
  })

  it('should accept ButtonProps', () => {
    // Создаем заглушку (mock) для onClickCallback
    const onClickCallback = jest.fn()

    // Типизированные свойства для кнопки
    const buttonProps: ButtonProps = {
      children: 'Click Me',
      onClickCallback: onClickCallback,
    }

    // Рендерим компонент, передавая типизированные свойства
    const { getByText } = render(<ButtonBlue {...buttonProps} />)

    // Проверяем, что компонент отобразил переданный текст
    expect(getByText('Click Me')).toBeInTheDocument()

    // Симулируем клик на кнопке
    fireEvent.click(getByText('Click Me'))

    // Проверяем, что onClickCallback был вызван
    expect(onClickCallback).toHaveBeenCalled()
  })
})
