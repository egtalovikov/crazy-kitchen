import React from 'react'
import { Comment } from '../Comment'
import Box from '@mui/material/Box'
import { TCommentFullServerData } from '../../api/forum/forum.types'

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
      {!!comments &&
        comments.map((comment: TCommentFullServerData) => (
          <Comment
            key={comment?.id}
            commentText={comment.message}
            commentAuthor={`${comment?.User?.first_name} ${comment?.User?.second_name}`}
            commentDate={new Date(comment?.createdAt).toLocaleString()}
            commentAvatar={
              comment?.User?.avatar
                ? 'https://ya-praktikum.tech/api/v2/resources' +
                  comment.User.avatar
                : ''
            }
          />
        ))}
    </Box>
  )
}
export default commentList
