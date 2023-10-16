import React, { MouseEvent } from 'react'
import EmojiList from '../../__mocks__/EmojiList'

type EmojiPickerProps = {
  onReactionAdd: (e: MouseEvent<HTMLSpanElement>) => void // Обработчик клика на эмодзи
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onReactionAdd }) => {
  const renderEmojies = () => {
    return EmojiList.map((emoji, index) => {
      return (
        <span
          style={{ marginRight: '5px' }}
          key={index}
          onClick={onReactionAdd}>
          {emoji}
        </span>
      )
    })
  }

  return <div>{renderEmojies()}</div>
}
