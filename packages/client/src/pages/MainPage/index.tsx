import React, { useState } from 'react'
import styles from './MainPage.module.scss'
import { ButtonBlue } from '../../components/Button'
import {
  FORUM_ROUTE,
  GAME_ROUTE,
  LEADERBOARD_ROUTE,
  PROFILE_ROUTE,
} from '../../utils/consts'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import Link from '@mui/material/Link'
import Fade from '@mui/material/Fade'
import { useGoToRoute } from '../../utils/useGoToRoute'

const MainPage = () => {
  const { goRoute } = useGoToRoute()

  const [open, setOpen] = useState(false)
  const [navigationDescription, setNavigationDescription] = useState(
    'Ищем ваше местополежение...'
  )
  const [hrefNavigation, setHrefNavigation] = useState('')

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      return document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      return document.exitFullscreen()
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setNavigationDescription(`Перейдите по `)
          setHrefNavigation(
            `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
          )
        },
        error => {
          setNavigationDescription(
            `Не получилось получить информацию о вашем местонахождении`
          )
        }
      )
    } else {
      setNavigationDescription(`Геолокация не поддерживается браузером`)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    getUserLocation()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div className={styles.background}>
      <div className={styles.wrapperTopButtons}>
        <div className={styles.wrapperLeftButtons}>
          <ButtonBlue onClickCallback={toggleFullScreen}>
            Полноэкранный режим
          </ButtonBlue>
          <ButtonBlue onClickCallback={handleOpen}>Покажи, где я</ButtonBlue>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2">
                  Ваше местоположение
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {navigationDescription}
                  {hrefNavigation && (
                    <Link href={hrefNavigation} target="_blank" variant="body2">
                      {' ссылка '}
                    </Link>
                  )}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
        <div className={styles.wrapperRightButtons}>
          <ButtonBlue onClickCallback={() => goRoute(FORUM_ROUTE)}>
            форум
          </ButtonBlue>
          <ButtonBlue onClickCallback={() => goRoute(LEADERBOARD_ROUTE)}>
            лидерборд
          </ButtonBlue>
          <ButtonBlue onClickCallback={() => goRoute(PROFILE_ROUTE)}>
            профиль
          </ButtonBlue>
        </div>
      </div>

      <Box
        bgcolor="#5bc7f2"
        color="white"
        p={4}
        style={{ borderRadius: 8 }}
        className={styles.description}>
        <div className={styles.descriptionText}>
          Вас охватывает безумие готовки, и вы жарите и режете как кухонный
          комбайн. Вы работаете в ресторанах разных стран и делаете самые разные
          блюда. ЖМИТЕ быстрее, чтобы успеть всё приготовить и подать клиентам.
          Напряженный, но логичный игровой процесс не даст заскучать и добавит
          адреналина в вашу жизнь.
        </div>
      </Box>

      <div className={styles.wrapperBottomButton}>
        <ButtonBlue onClickCallback={() => goRoute(GAME_ROUTE)}>
          играть
        </ButtonBlue>
      </div>
    </div>
  )
}

export default MainPage
