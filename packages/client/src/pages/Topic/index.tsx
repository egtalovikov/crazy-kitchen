import React from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicMainCard } from '../../components/ArticleCard'
import { Comment } from '../../components/Comment'

const Topic = () => {
  return (
    <div className={styles.background}>
      <Container sx={{ width: '90%;' }} classes={{ root: styles.container }}>
        <TopicMainCard />
        <Comment />
      </Container>
    </div>
  )
}
export default Topic
