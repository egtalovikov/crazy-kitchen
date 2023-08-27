import * as React from 'react'
import styles from './Topic.module.scss'
import Container from '@mui/material/Container'
import { TopicCard } from '../../components/topicCard'
import InputBase from '@mui/material/InputBase'
import { ButtonBlue } from '../../components/Button'
import { TOPIC_ROUTE_CREATE } from '../../utils/consts'
import { useGoToRoute } from '../../utils/useGoToRoute'

const Forum = () => {
  const { goRoute } = useGoToRoute()

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
        <TopicCard title={'Hi, world'} mainText={'sssss'} />
        <TopicCard title={'Best game'} mainText={'ssssss321312'} />
        <ButtonBlue onClickCallback={() => goRoute(TOPIC_ROUTE_CREATE)}>
          Cоздать свой классный топик
        </ButtonBlue>
      </Container>
    </div>
  )
}

export default Forum
