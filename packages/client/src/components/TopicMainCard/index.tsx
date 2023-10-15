import * as React from 'react'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

export const TopicMainCard = ({
  mainText,
  title,
  createdAt,
}: {
  mainText: string
  title: string
  createdAt: string
}) => (
  <Card variant="outlined" sx={{ width: 'auto' }}>
    <div>
      <Typography level="h1" fontSize="2.2rem" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography level="body-sm">
        {new Date(createdAt).toLocaleString()}
      </Typography>
    </div>
    <Typography level="body-sm" sx={{ mb: 1 }}>
      {mainText}
    </Typography>
  </Card>
)
