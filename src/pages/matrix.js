import React, { useContext } from "react"
import WordPane from '../components/word-pane'
import { Box } from 'grommet'
import { graphql } from 'gatsby'
import AppContext from '../app-context'

const Matrix = ({data}) => {
  // const list = data.allWordsYaml.nodes
  const {appState, dispatch} = useContext(AppContext)

  return (
    <Box
      direction="column"
      fill={true}
      overflow="scroll"
    >
    {
      // appState.words.filter(word => word.num >= appState.matrixPage && word.num < (appState.matrixPage + 10))
      //   .map(word =>
      //     <WordPane
      //       num={word.num}
      //       word={word.word}
      //       key={word.num}
      //     />
      //   )
    }
    {
      appState.words.filter((word,i) => i >= appState.matrixPage && i < (appState.matrixPage + 10))
        .map(word =>
          <WordPane
            num={i}
            word={word}
            key={word}
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

