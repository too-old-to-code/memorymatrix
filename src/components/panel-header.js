import React from 'react'
import PropTypes from 'prop-types'
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
        background="#253473"
      >
        {item.number}
      </ShinyBall>
      <Text>{item.sound}</Text>
      {active === item.number ? <Subtract/> : <Add />}
    </Box>
  )
}

PanelHeader.propTypes = {
  item: PropTypes.string,
  active: PropTypes.bool
}

export default PanelHeader