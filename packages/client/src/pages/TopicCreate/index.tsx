import React from 'react'
import styles from './TopicCreate.module.scss'
import Container from '@mui/material/Container'
import DialogTitle from '@mui/material/DialogTitle'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const TopicCreate = () => {
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
          <Button variant="contained">Создать</Button>
        </Box>
      </Container>
    </div>
  )
}
export default TopicCreate
