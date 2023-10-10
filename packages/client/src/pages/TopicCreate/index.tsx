import React from 'react'
import styles from './TopicCreate.module.scss'
import Container from '@mui/material/Container'
import DialogTitle from '@mui/material/DialogTitle'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
  TTopicForSave,
  TTopicMessageForSave,
} from '../../api/forum/forum.types'
import { topiCreateData } from '../../api/mock'
import forumApi from '../../api/forum'

const TopicCreate = () => {
  const showTopicCreationError = () => {
    console.log('ошибка')
  }
  const addNewTopicToList = () => {
    console.log('addNewTopicToList')
  }
  const mock = topiCreateData

  const creteTopic = (data: TTopicMessageForSave | TTopicForSave) => {
    const topicData = data as TTopicForSave
    if (topicData) {
      return forumApi.saveTopic(
        topicData,
        addNewTopicToList,
        showTopicCreationError
      )
    } else {
      console.log('Save topic: invalid data for saving')
    }
  }

  return (
    <div className={styles.background}>
      <Container maxWidth="sm" classes={{ root: styles.container }}>
        <DialogTitle sx={{ paddingLeft: '0' }}>Создайте топик</DialogTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}>
          <Input sx={{ marginBottom: '20px' }} placeholder="Название топика" />
          <TextField
            sx={{ marginBottom: '20px' }}
            placeholder="Текст топика"
            multiline
            rows={4}
          />
          <Button variant="contained" onClick={() => creteTopic(mock)}>
            Создать
          </Button>
        </Box>
      </Container>
    </div>
  )
}
export default TopicCreate
