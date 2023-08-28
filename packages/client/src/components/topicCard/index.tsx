import * as React from 'react'
import { FC } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
export const TopicCardPreview: FC<CardProps> = ({ mainText, title }) => (
  <React.Fragment>
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </React.Fragment>
)

export interface CardProps {
  title: string
  mainText: string
}
