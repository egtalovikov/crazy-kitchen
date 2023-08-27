import * as React from 'react'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'

export const Comment = () => (
  <Card
    variant="outlined"
    sx={{
      width: 'max(100%)',
      marginTop: 2,
      borderRadius: 0,
      '--Card-radius': 0,
    }}>
    <CardContent orientation="horizontal">
      <img
        width={44}
        height={44}
        src="https://img.uefa.com/imgml/TP/players/2020/2022/324x324/95803.jpg"
      />
      <div>
        <p>Leo Messi</p>
        <p>April 24 to May 02, 2021</p>
      </div>
    </CardContent>
    <CardContent sx={{ gap: 0.5, mt: 1 }}>
      <p>I love this National park so much</p>
    </CardContent>
  </Card>
)
