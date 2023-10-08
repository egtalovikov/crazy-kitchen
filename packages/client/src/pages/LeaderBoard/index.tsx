import React, { useEffect, useState } from 'react'
import styles from './LeaderBoard.module.scss'
import { generateUID } from '../../utils/useUID'
import Box from '@mui/material/Box'
import { List, ListItem } from '@mui/material'
import { getLeaderBoard } from '../../api/leaderBoard'
import { Player } from '../../api/leaderBoard/leaderBoard.types'

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const request = async () => {
      try {
        const players = await getLeaderBoard()
        setPlayers(players)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])

  return (
    <div className={styles.background}>
      <Box bgcolor="#5bc7f2" color="white" p={2} className={styles.description}>
        <div className={styles.title}>Leaderboard</div>
        <List>
          {players.length &&
            players.map(player => (
              <ListItem
                key={generateUID()}
                style={{ justifyContent: 'space-between' }}
                className={styles.player_item}>
                <div className={styles.player_name}>
                  {player.data.playerName}
                </div>
                <div className={styles.player_score}>
                  {player.data.CrazyKitchenScore}
                </div>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  )
}

export default Leaderboard
