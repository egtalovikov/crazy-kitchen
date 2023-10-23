import React, { useState } from 'react'
import Button from '@mui/material/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { changePassword } from '@api/user'

type ChangePasswordProps = {
  open: boolean
  handleClose: () => void
}

const ChangePassword = ({ open, handleClose }: ChangePasswordProps) => {
  const [oldPasswordValue, setOldPasswordValue] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')

  const updatePassword = async () => {
    try {
      await changePassword({
        oldPassword: oldPasswordValue,
        newPassword: newPasswordValue,
      })
      setOldPasswordValue('')
      setNewPasswordValue('')
      handleClose()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Сменить пароль</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            value={oldPasswordValue}
            onChange={e => setOldPasswordValue(e.target.value)}
            label="Старый пароль"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="newPassword"
            value={newPasswordValue}
            onChange={e => setNewPasswordValue(e.target.value)}
            label="Новый пароль"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={updatePassword} variant="contained">
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ChangePassword
