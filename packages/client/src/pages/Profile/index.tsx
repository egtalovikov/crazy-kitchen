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
import ChangePassword from '../../components/modals/ChangePassword'
import ChangeAvatar from '../../components/modals/ChangeAvatar'
import { User } from '../../types/user'

const Profile = () => {
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const [user, setUser] = useState({} as User)
  const [userForList, setUserForList] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo()
        setUser(data)
      } catch (e) {
        console.log(e)
      }
    }
    void fetchUser()
  }, [])

  useEffect(() => {
    if (user.avatar) {
      setAvatarUrl(import.meta.env.VITE_API_URL + 'resources' + user.avatar)
    }
  }, [user.avatar])

  useEffect(() => {
    setUserForList({
      Почта: user.email,
      Логин: user.login,
      Имя: user.first_name,
      Фамилия: user.second_name,
      'Имя в игре': user.display_name,
      Телефон: user.phone,
    })
  }, [user])

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
            src={avatarUrl}
            sx={{
              height: 150,
              width: 150,
            }}
          />
          <List className={styles.list}>
            {Object.entries(userForList).map(([key, value]) => (
              <ListItem
                key={key}
                divider={Object.keys(userForList).pop() !== key ? true : false}
                disableGutters
                secondaryAction={
                  <Typography className={styles.valueText}>
                    {`${value}`}
                  </Typography>
                }>
                <ListItemText primary={key} />
              </ListItem>
            ))}
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
