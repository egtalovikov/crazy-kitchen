import * as React from 'react'
import { FC } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { TOPIC_ROUTE } from '../../utils/consts'

export const TopicCardPreview: FC<CardProps> = ({
  mainText,
  title,
  createdAt,
  id,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Card sx={{ minWidth: 275, marginBottom: 3 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 24, marginBottom: 1 }}
            color="text.secondary">
            {title}
          </Typography>

          <Typography variant="body2">{mainText}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() =>
              navigate(TOPIC_ROUTE, {
                replace: false,
                state: { mainText, title, createdAt, id },
              })
            }
            size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export interface CardProps {
  title: string
  mainText: string
  createdAt: string
  id: number
}
