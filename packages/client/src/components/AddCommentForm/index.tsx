import React, { ChangeEvent, useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import forumApi from '../../api/forum'
import { useSelector } from 'react-redux'
import { CoreRootState } from '../../store/types'

export const AddCommentForm = ({
  topicId,
  comments,
  setComments,
}: {
  topicId: number
  comments: []
  setComments: React.Dispatch<React.SetStateAction<[any]>>
}) => {
  const [comment, setComment] = useState<string>('')
  const { id } = useSelector(
    (rootState: CoreRootState) => rootState.authReducer
  )

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
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'auto',
        background: 'white',
        padding: '40px 15px',
        marginTop: '40px',
      }}>
      <Input
        sx={{ width: '80%', borderRadius: 1 }}
        placeholder="Напишите комментарий"
        value={comment}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        sx={{ width: 'max-content', borderRadius: 1 }}
        onClick={handleSubmit}>
        Отправить
      </Button>
    </Box>
  )
}
