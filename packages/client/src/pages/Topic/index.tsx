import React from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicMainCard } from '../../components/TopicMainCard'
import CommentList from '../../components/CommentList'
import { AddCommentForm } from '../../components/AddCommentForm'
import { TopicReaction } from '../../components/TopicReaction'

const Topic = () => {
  return (
    <div className={styles.background}>
      <Container sx={{ width: '90%;' }} classes={{ root: styles.container }}>
        <TopicMainCard />
        <TopicReaction />
        <AddCommentForm />
        <CommentList />
      </Container>
    </div>
  )
}
export default Topic
