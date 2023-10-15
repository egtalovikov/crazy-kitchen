import React, { useEffect, useState } from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicMainCard } from '../../components/TopicMainCard'
import CommentList from '../../components/CommentList'
import { AddCommentForm } from '../../components/AddCommentForm'
import { useLocation } from 'react-router-dom'
import forumApi from '../../api/forum'

const Topic = () => {
  const location = useLocation()

  const [comments, setComments] = useState<[]>([])

  useEffect(() => {
    const getComments = async () => {
      const { data } = await forumApi.getComments(location.state.id)
      setComments(data.comments)
    }

    getComments()
  }, [])

  return (
    <div className={styles.background}>
      <Container sx={{ width: '90%;' }} classes={{ root: styles.container }}>
        <TopicMainCard
          title={location.state.title}
          mainText={location.state.mainText}
          createdAt={location.state.createdAt}
        />
        <AddCommentForm
          comments={comments}
          setComments={setComments}
          topicId={location.state.id}
        />
        <CommentList comments={comments} />
      </Container>
    </div>
  )
}
export default Topic
