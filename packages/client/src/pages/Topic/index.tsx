import React from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicMainCard } from '../../components/TopicMainCard'
import CommentList from '../../components/CommentList'
import { AddCommentForm } from '../../components/AddCommentForm'

const Topic = () => {
  return (
    <div className={styles.background}>
      <Container sx={{ width: '90%;' }} classes={{ root: styles.container }}>
        <TopicMainCard />
        <AddCommentForm />
        <CommentList />
      </Container>
    </div>
  )
}
export default Topic
