import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  Dispatch, 
  SetStateAction,
  useRef,
  useState,
} from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import styles from './AddCommentForm.module.scss'
import forumApi from '../../api/forum'
import emojiButton from '../../assets/images/emoji-button.png'
import { EmojiPicker } from '../../components/emojiPicker/emogiPicker'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { CoreRootState } from '../../store/types'

export const AddCommentForm = ({
  topicId,
  comments,
  setComments,
}: {
  topicId: number
  comments: []
  setComments: Dispatch<SetStateAction<any>>
}) => {
  const [comment, setComment] = useState<string>('')
  const { id } = useSelector(
    (rootState: CoreRootState) => rootState.authReducer
  )
  const emojisEl = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const { data } = await forumApi.createComment(topicId, comment, id)
      setComment('')
      setComments([...comments, { ...data, createdDate: data.createdAt }])
    } catch (e) {
      console.log(e)
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
          onClick={handlerButtonClick}
          ref={emojisEl}></button>
      </div>
      <div
        className={classNames(
          styles.popup,
          isOpen && styles.popup_open,
          styles[`popup_${'bottom'}`]
        )}>
        <EmojiPicker onReactionAdd={handlerEmojiClick} />
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
