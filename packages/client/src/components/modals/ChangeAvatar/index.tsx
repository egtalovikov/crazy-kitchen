import React, { useState } from 'react'
import Button from '@mui/material/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { changeAvatar } from '@api/user'
import { User } from '@/types/user'

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

  const updateAvatar = async () => {
    if (avatar && avatar.type?.split('/')[0] === 'image') {
      try {
        const { data } = await changeAvatar(avatar)
        setAvatar(undefined)
        setUser({ ...user, avatar: data.avatar })
        handleClose()
      } catch (e) {
        console.error(e)
      }
    }
  }

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) return
    setAvatar(ev.target.files[0])
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Сменить аватар</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Загрузить файл
            <input type="file" onChange={onChange} hidden />
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
