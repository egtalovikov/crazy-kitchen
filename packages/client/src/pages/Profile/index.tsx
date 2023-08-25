import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import { getUserInfo } from '../../api/user'
import { REACT_APP_API_URL } from '../../utils/consts'
import ChangePassword from '../../components/modals/ChangePassword'
import ChangeAvatar from '../../components/modals/ChangeAvatar'

const Profile = () => {
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)

  const [user, setUser] = useState({
    avatar: '',
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
  })

  useEffect(() => {
    getUserInfo().then(data => setUser(data))
  }, [])

  return (
    <div className={styles.background}>
      <CssBaseline />
      <Grid
        container
        className={styles.wrapper}
        sx={{
          width: 400,
        }}
        alignItems={'center'}
        justifyContent={'center'}>
        <Grid
          className={styles.profileContainer}
          container
          alignItems={'center'}
          direction={'column'}
          p={5}>
          <Avatar
            alt={`${user.first_name} ${user.second_name}`}
            src={
              user.avatar ? REACT_APP_API_URL + 'resources' + user.avatar : ''
            }
            sx={{
              height: 150,
              width: 150,
            }}
          />
          <List className={styles.list}>
            <ListItem
              divider
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.email}
                </Typography>
              }>
              <ListItemText primary="Почта" />
            </ListItem>
            <ListItem
              divider
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.login}
                </Typography>
              }>
              <ListItemText primary="Логин" />
            </ListItem>
            <ListItem
              divider
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.first_name}
                </Typography>
              }>
              <ListItemText primary="Имя" />
            </ListItem>
            <ListItem
              divider
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.second_name}
                </Typography>
              }>
              <ListItemText primary="Фамилия" />
            </ListItem>
            <ListItem
              divider
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.display_name}
                </Typography>
              }>
              <ListItemText primary="Имя в игре" />
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <Typography className={styles.valueText}>
                  {user.phone}
                </Typography>
              }>
              <ListItemText primary="Телефон" />
            </ListItem>
          </List>
          <Box
            p={5}
            sx={{
              gap: 2,
            }}
            className={styles.buttonsContainer}
            alignItems={'center'}
            justifyContent={'center'}>
            <Button
              variant={'outlined'}
              onClick={() => setChangePasswordVisible(true)}>
              Изменить пароль
            </Button>
            <Button
              variant={'outlined'}
              onClick={() => setChangeAvatarVisible(true)}>
              Изменить аватар
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ChangePassword
        open={changePasswordVisible}
        handleClose={() => setChangePasswordVisible(false)}
      />
      <ChangeAvatar
        open={changeAvatarVisible}
        handleClose={() => setChangeAvatarVisible(false)}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}

export default Profile
