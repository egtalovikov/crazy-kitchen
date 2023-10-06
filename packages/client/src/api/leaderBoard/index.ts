import { $host } from '../index'
import { AxiosResponse } from 'axios'
import { Player } from './leaderBoard.types'

const teamName = 'crazyKitchen'

export const getLeaderBoard = async (): Promise<Player[]> => {
  const ratingFieldNameData = {
    ratingFieldName: 'CrazyKitchenScore',
    cursor: 0,
    limit: 10,
  }
  const { data }: AxiosResponse<Player[]> = await $host.post(
    `leaderboard/${teamName}`,
    ratingFieldNameData
  )
  return data
}

export const addPlayerToLeaderBoard = async (
  playerName: string,
  playerScore: number | string
): Promise<void> => {
  const addData = {
    data: {
      playerName: playerName,
      CrazyKitchenScore: playerScore,
    },
    ratingFieldName: 'CrazyKitchenScore',
    teamName: teamName,
  }
  await $host.post('leaderboard', addData)
}
