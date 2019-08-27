import React from "react"
import WordPane from '../components/word-pane'
import { Box } from 'grommet'
import { graphql } from 'gatsby'

const Matrix = ({data}) => {
  const [pageNum, setPageNum] = React.useState(0)
  const list = data.allWordsYaml.nodes

  return (
    <Box
      direction="column"
      fill={true}
      overflow="scroll"
    >
    {
      list.filter(word => word.num >= pageNum && word.num < (pageNum + 10))
        .map(word =>
          <WordPane num={word.num} word={word.word} key={word.num}/>
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

