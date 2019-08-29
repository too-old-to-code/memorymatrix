import './revision.scss'
import React, { useContext } from 'react'
import { Box, Grid, Text } from 'grommet'
import AppContext from '../app-context'

export default () => {
  const {appState} = useContext(AppContext)

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
        appState.defaultValues.filter((word) => word.num >= appState.revisionPage && word.num < (appState.revisionPage + 25))
          .map(wordObj =>
          <Box
            key={wordObj.value}
            style={{border: 'solid 1px grey'}}
            align="center"
            justify="center"
            background="light-4"
          >
          <Text
            background="brand"
            weight="bold"
          >{wordObj.num}
          </Text>
          </Box>
        )
      }
    </Grid>
  )
}

export const query = graphql`
  query revisionPageQuery {
    allWordsYaml {
      nodes {
        num
        word {
          alternatives
          default
        }
      }
    }
  }
`