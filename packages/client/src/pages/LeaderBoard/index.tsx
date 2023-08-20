import React from 'react'
import styles from './Leaderboard.module.scss'
import { useUID } from '../../utils/useUID'
import Box from '@mui/material/Box'
import { List, ListItem } from '@mui/material'

const Leaderboard = () => {
  const uid = useUID()

  const players = [
    { name: 'Игрок 1', score: 100 },
    { name: 'Игрок 2', score: 85 },
    { name: 'Игрок 3', score: 72 },
  ]

  return (
    <div className={styles.background}>
      <Box
        bgcolor="#5bc7f2"
        color="white"
        p={2}
        style={{ borderRadius: 8 }}
        className={styles.description}>
        <div className={styles.title}>Leaderboard</div>
        <List>
          {players.map(player => (
            <ListItem
              key={uid}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
              className={styles.player_item}>
              <div className={styles.player_name}>{player.name}</div>
              <div className={styles.player_score}>{player.score}</div>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  )
}

export default Leaderboard
