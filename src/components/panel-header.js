import React from 'react'
import { Box, Text } from 'grommet'
import { Add, Subtract } from 'grommet-icons'
import ShinyBall from './shiny-ball'

const PanelHeader = ({item, active}) => {
  return (
    <Box
      direction="row"
      pad="large"
      align="center"
      justify="between"
    >
      <ShinyBall
        size="45"
        background="dark-1"
      >
        {item.number}
      </ShinyBall>
      <Text>{item.sound}</Text>
      {active === item.number ? <Subtract/> : <Add />}
    </Box>
  )
}

export default PanelHeader