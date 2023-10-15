import React from 'react'
import { Comment } from '../Comment'
import Box from '@mui/material/Box'

const commentList = ({ comments }: { comments: [] }) => {
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
      {comments.map(
        (comment: {
          message: string
          author: string
          createdDate: string | number | Date
          authorAvatar: string
        }) => (
          <Comment
            commentText={comment.message}
            commentAuthor={comment.author}
            commentDate={new Date(comment.createdDate).toLocaleString()}
            commentAvatar={
              comment.authorAvatar
                ? 'https://ya-praktikum.tech/api/v2/resources' +
                  comment.authorAvatar
                : ''
            }
          />
        )
      )}
    </Box>
  )
}
export default commentList
