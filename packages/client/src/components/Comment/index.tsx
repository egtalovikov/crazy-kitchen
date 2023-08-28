import * as React from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import styles from './Comment.module.scss'
import { FC } from 'react'
export const Comment: FC<CommentProps> = ({
  commentAvatar,
  commentAuthor,
  commentDate,
  commentText,
}) => (
  <Card
    variant="outlined"
    sx={{
      width: 'max(95%)',
      marginTop: 2,
      borderRadius: 0,
      '--Card-radius': 0,
    }}>
    <CardContent orientation="horizontal">
      <img width={44} height={44} alt={'avatar'} src={commentAvatar} />
      <div className={styles.commentData}>
        <p>{commentAuthor}</p>
        <p>{commentDate}</p>
      </div>
    </CardContent>
    <CardContent sx={{ gap: 0.5, mt: 1 }}>
      <p>{commentText}</p>
    </CardContent>
  </Card>
)

export interface CommentProps {
  commentAvatar: string
  commentAuthor: string
  commentDate: string
  commentText: string
}
