import React, { ChangeEvent, useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export const AddCommentForm: React.FC = () => {
  const [comment, setComment] = useState<string>('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = () => {
    console.log('Submitted comment:', comment)
    setComment('')
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
