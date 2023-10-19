import * as React from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicCardPreview } from '../../components/topicCard'
import InputBase from '@mui/material/InputBase'
import { ButtonBlue } from '../../components/Button'
import { TOPIC_ROUTE_CREATE } from '../../utils/consts'
import { useGoToRoute } from '../../utils/useGoToRoute'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import forumApi from '../../api/forum'
import { TTopicByIdServerData } from '../../api/forum/forum.types'

const Forum = () => {
  const { goRoute } = useGoToRoute()
  const [topics, setTopics]: [
    topics: [],
    setTopics: Dispatch<SetStateAction<[]>>
  ] = useState([])

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { data } = await forumApi.getTopics()
        setTopics(data)
      } catch (e) {
        console.log(e)
      }
    }

    getTopics()
  }, [])

  return (
    <div className={styles.background}>
      <Container maxWidth="sm" classes={{ root: styles.container }}>
        <InputBase
          sx={{
            padding: 1,
            border: 0.5,
            width: '100%',
            marginBottom: '20px',
            borderRadius: 1,
          }}
          placeholder={'Давай поищем тебе топик'}
          classes={{ root: styles.search }}
        />
        {!!topics &&
          topics.map((topic: TTopicByIdServerData) => (
            <TopicCardPreview
              key={topic.id}
              title={topic.topicName}
              mainText={topic.message}
              createdAt={topic.createdAt}
              id={topic.id}
            />
          ))}
        <ButtonBlue onClickCallback={() => goRoute(TOPIC_ROUTE_CREATE)}>
          Создать свой классный топик
        </ButtonBlue>
      </Container>
    </div>
  )
}

export default Forum
