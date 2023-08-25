import React, { useState } from 'react'
import Button from '@mui/material/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { changeAvatar } from '../../../api/user'

type User = {
  avatar: string
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}
type ChangeAvatarProps = {
  open: boolean
  handleClose: () => void
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const ChangeAvatar = ({
  open,
  handleClose,
  user,
  setUser,
}: ChangeAvatarProps) => {
  const [avatar, setAvatar] = useState<File | undefined>(undefined)

  const updateAvatar = () => {
    if (avatar && avatar.type?.split('/')[0] === 'image') {
      changeAvatar(avatar).then(data => {
        setAvatar(undefined)
        setUser({ ...user, avatar: data.data.avatar })
        handleClose()
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Сменить аватар</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Загрузить файл
            <input
              type="file"
              onChange={e => {
                if (!e.target.files) return
                setAvatar(e.target.files[0])
              }}
              hidden
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={updateAvatar} variant="contained">
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ChangeAvatar
