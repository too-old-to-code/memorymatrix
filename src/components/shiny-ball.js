import './shiny-ball.scss'
import React from 'react'
import { Box, Text } from 'grommet'

const ShinyBall = ({ children, size, background, style }) => {
  let part = size / 55

  return (
    <Box
      className="shiny-ball"
      background={background}
      style={{
        width:`${size}px` ,
        height: `${size}px`,
        ...style
      }}
    >
      <div>
        <div
          className="reflection"
          style={{ width: `${part*40}px` , height: `${part*30}px`}}
        ></div>
      </div>
      <Text size="xlarge" weight="bold">{children}</Text>
    </Box>
  )
}

export default ShinyBall