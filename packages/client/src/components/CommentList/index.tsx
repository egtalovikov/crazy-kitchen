import React from 'react'
import { Comment } from '../Comment'
import Box from '@mui/material/Box'

const commentList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        background: 'white',
        padding: '40px 15px',
        marginTop: '40px',
      }}>
      <Comment
        commentText={'I love this National park so much'}
        commentAuthor={'Leo Messi'}
        commentDate={'24 april 2022'}
        commentAvatar={
          'https://img.uefa.com/imgml/TP/players/2020/2022/324x324/95803.jpg'
        }
      />
    </Box>
  )
}
export default commentList
