import React, { useContext } from "react"
import WordPane from '../components/word-pane'
import { Box } from 'grommet'
import { graphql } from 'gatsby'
import AppContext from '../app-context'

const Matrix = ({data}) => {
  const { appState } = useContext(AppContext)

  return (
    <Box
      direction="column"
      fill={true}
      overflow="scroll"
    >
    {
      appState.defaultValues.filter((word) => word.num >= appState.matrixPage && word.num < (appState.matrixPage + 10))
        .map(word =>
          <WordPane
            num={word.num}
            word={word.value}
            key={word.num}
          />
        )
    }
    </Box>
  )
}

export default Matrix

export const query = graphql`
  query matrixPageQuery {
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

