import React, { MouseEvent, useState } from 'react'
import Card from '@mui/joy/Card'
import { EmojiPicker } from '../../components/emojiPicker/emogiPicker'

interface Reactions {
  [key: string]: number
}

export const TopicReaction: React.FC = () => {
  const [reactions, setReactions] = useState<Reactions>({})

  const handlerEmojiClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement
    const emoji = target.textContent

    const newReactions: Reactions = { ...reactions }

    if (emoji !== null) {
      if (newReactions[emoji]) {
        newReactions[emoji]++
      } else {
        newReactions[emoji] = 1
      }
      setReactions(newReactions)
    }
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
        <EmojiPicker onReactionAdd={handlerEmojiClick} />
      </Card>
    </div>
  )
}
