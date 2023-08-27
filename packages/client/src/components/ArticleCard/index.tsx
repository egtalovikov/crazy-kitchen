import * as React from 'react'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'

export const TopicMainCard = () => (
  <Card variant="outlined" sx={{ width: '100%' }}>
    <div>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        <h1>Yosemite National Park</h1>
      </Typography>
      <Typography level="body-sm">
        <p>April 24 to May 02, 2021</p>
      </Typography>
    </div>
    <Typography level="body-sm" sx={{ mb: 1 }}>
      <p>
        Yosemite National Park is an American national park in the western
        Sierra Nevada of Central California, bounded on the southeast by Sierra
        National Forest and on the northwest by Stanislaus National Forest.
      </p>
    </Typography>
    <CardContent orientation="horizontal">
      <Button
        variant="solid"
        size="sm"
        color="primary"
        aria-label="Explore Bahamas Islands"
        sx={{ ml: 'auto', fontWeight: 600 }}>
        Add comment
      </Button>
    </CardContent>
  </Card>
)
