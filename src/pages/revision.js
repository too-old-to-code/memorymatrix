import './revision.scss'
import React, { useContext } from 'react'
import { Box, Grid, Text } from 'grommet'
import AppContext from '../app-context'

const generateCards = (num) => {
  const collection = []
  for (let n = num; n < num + 25; n++) {
    collection.push(
      <Box
        key={n}
        style={{border: 'solid 1px grey'}}
        align="center"
        justify="center"
        background="light-4"
      >
      <Text
        background="brand"
        weight="bold"
      >{n}
      </Text>
      </Box>
    )
  }
  return collection
}

export default () => {
  const {appState, dispatch} = useContext(AppContext)

  return (
    <Grid
      className="revision-grid"
      margin={{ horizontal: 'small' }}
      rows={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
      columns={['flex', 'flex', 'flex', 'flex', 'flex']}
      gap="small"
      justifyContent="center"
      justify="stretch"
    >
      {
        generateCards(appState.revisionPage)
      }
    </Grid>
  )
}
