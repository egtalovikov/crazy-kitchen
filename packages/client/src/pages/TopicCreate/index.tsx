import React, { useState } from 'react'
import styles from './TopicCreate.module.scss'
import Container from '@mui/material/Container'
import DialogTitle from '@mui/material/DialogTitle'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { CoreRootState } from '../../store/types'
import forumApi from '../../api/forum'
import { useGoToRoute } from '../../utils/useGoToRoute'
import { FORUM_ROUTE } from '../../utils/consts'

const TopicCreate = () => {
  const { goRoute } = useGoToRoute()
  const [title, setTitle] = useState('')
  const [mainText, setMainText] = useState('')
  const { id } = useSelector(
    (rootState: CoreRootState) => rootState.authReducer
  )

  const handleSubmit = async () => {
    try {
      await forumApi.createTopic(id, title, mainText)
      goRoute(FORUM_ROUTE)
    } catch (e) {
      console.log(e)
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
          <Input
            sx={{ marginBottom: '20px' }}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Название топика"
          />
          <TextField
            value={mainText}
            onChange={e => setMainText(e.target.value)}
            sx={{ marginBottom: '20px' }}
            placeholder="Текст топика"
            multiline
            rows={4}
          />
          <Button onClick={handleSubmit} variant="contained">
            Создать
          </Button>
        </Box>
      </Container>
    </div>
  )
}
export default TopicCreate
