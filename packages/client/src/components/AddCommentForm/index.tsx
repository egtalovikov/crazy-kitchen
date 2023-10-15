import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import EmojiList from '../../__mocks__/EmojiList'
import styles from './AddCommentForm.module.scss'
import emojiButton from '../../assets/images/emoji-button.png'

export const AddCommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>('')
  const emojisEl = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handlerButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handlerEmojiClick = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement
    setComment(prev => `${prev}${target.textContent}`)
  }

  const handleSubmit = () => {
    console.log('Submitted comment:', comment)
    setComment('')
  }

  useEffect(() => {
    const onClick = ({ target }: Event): void => {
      if (!emojisEl.current?.contains(target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'auto',
        background: 'white',
        padding: '55px 15px',
        marginTop: '40px',
        position: 'relative',
      }}>
      <div className={styles['comment-box']}>
        <Input
          sx={{ width: '80%', borderRadius: 1 }}
          placeholder="Напишите комментарий"
          value={comment}
          onChange={handleInputChange}
        />
        <button
          className={styles['emoji-button']}
          style={{ backgroundImage: `url(${emojiButton})` }}
          onClick={e => handlerButtonClick(e)}
          ref={emojisEl}></button>
      </div>
      <div
        className={`${styles.popup} ${isOpen ? styles['popup_open'] : ''} ${
          styles[`popup_${'bottom'}`]
        }`}>
        {renderEmojies()}
      </div>

      <Button
        variant="contained"
        sx={{ width: 'max-content', borderRadius: 1 }}
        onClick={handleSubmit}>
        Отправить
      </Button>
    </Box>
  )
}
