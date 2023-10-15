import React, { MouseEvent, useState } from 'react'
import EmojiList from '../../__mocks__/EmojiList'
import Card from '@mui/joy/Card'

import styles from '@components/AddCommentForm/AddCommentForm.module.scss'

interface Reactions {
  [key: string]: number
}

export const TopicReaction: React.FC = () => {
  const [reactions, setReactions] = useState<Reactions>({})

  const handlerEmojiClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement
    const emoji = target.textContent

    const newReactions: Reactions = { ...reactions }

    newReactions[emoji!] = (newReactions[emoji!] || 0) + 1

    setReactions(newReactions)
  }

  const renderEmojies = () => {
    return EmojiList.map((emoji, index) => {
      return (
        <span
          style={{ marginRight: '5px' }}
          className={styles.emoji}
          key={index}
          onClick={handlerEmojiClick}>
          {emoji}
        </span>
      )
    })
  }

  return (
    <div>
      <Card>
        <div>
          {Object.entries(reactions).map(([emoji, count]) => (
            <span key={emoji}>
              {emoji} ({count})
            </span>
          ))}
        </div>
        <div>{renderEmojies()}</div>
      </Card>
    </div>
  )
}
