import React, { useContext, useState } from 'react'
import { Box, Grid, Text } from 'grommet'
import { graphql } from 'gatsby'
import AppContext from '../app-context'

export default () => {
  const {appState} = useContext(AppContext)
  const [ currentWord, changeWord ]= useState('')

  return (
    <Box
      align="center"
      justify="center"
    >
      <Box
        height="xsmall"
        align="center"
        justify="center"
      >
      <Text size="xxlarge">{currentWord}</Text>
      </Box>
    <Grid
      margin={{ horizontal: 'small' }}
      rows={['xxsmall', 'xxsmall', 'xxsmall', 'xxsmall', 'xxsmall']}
      columns={['flex', 'flex', 'flex', 'flex', 'flex']}
      gap="small"
      justifyContent="center"
      justify="stretch"
      style={{minWidth: '300px'}}
    >
      {
        appState.defaultValues.filter((word) => word.num >= appState.matrixPage && word.num < (appState.matrixPage + 25))
          .map((wordObj, index) =>
          <Box
            role="button"
            key={wordObj.value}
            align="center"
            justify="center"
            background={ currentWord === wordObj.label ?  "brand" : "#6573af" }
            color="white"
            border="all"
            round={true}
            onClick={() => changeWord(wordObj.label)}
            activeIndex={index}
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
    </Box>
  )
}

export const query = graphql`
  query setupPageQuery {
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