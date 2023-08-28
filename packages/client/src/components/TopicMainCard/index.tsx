import * as React from 'react'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

export const TopicMainCard = () => (
  <Card variant="outlined" sx={{ width: 'auto' }}>
    <div>
      <Typography level="h1" fontSize="2.2rem" sx={{ mb: 0.5 }}>
        Yosemite National Park
      </Typography>
      <Typography level="body-sm">April 24 to May 02, 2021</Typography>
    </div>
    <Typography level="body-sm" sx={{ mb: 1 }}>
      Yosemite National Park is an American national park in the western Sierra
      Nevada of Central California, bounded on the southeast by Sierra National
      Forest and on the northwest by Stanislaus National Forest. Yosemite
      National Park is an American national park in the western Sierra Nevada of
      Central California, bounded on the southeast by Sierra National Forest and
      on the northwest by Stanislaus National Forest. Yosemite National Park is
      an American national park in the western Sierra Nevada of Central
      California, bounded on the southeast by Sierra National Forest and on the
      northwest by Stanislaus National Forest.
    </Typography>
  </Card>
)
