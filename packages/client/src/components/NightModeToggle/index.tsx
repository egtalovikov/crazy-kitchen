import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import styles from './NightModdleToggle.module.scss'
import { useColorTheme } from '../../theme/useColorTheme'

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useColorTheme()

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleColorMode}
      color="inherit"
      classes={{ root: styles.modeToggle }}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default NightModeToggle
