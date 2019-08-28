import React, { useContext } from "react"
import WordPane from '../components/word-pane'
import { Box } from 'grommet'
import { graphql } from 'gatsby'
import AppContext from '../app-context'

const Matrix = ({data}) => {
  const [pageNum, setPageNum] = React.useState(0)
  const list = data.allWordsYaml.nodes
  const {page, changePage} = useContext(AppContext)
  console.log(page)
  // changePage(page + 10)

  return (
    <Box
      direction="column"
      fill={true}
      overflow="scroll"
    >
    {
      list.filter(word => word.num >= page && word.num < (page + 10))
        .map(word =>
          <WordPane num={word.num} word={word.word} key={word.num}/>
        )
    }
    </Box>
  )
}

export default Matrix

export const query = graphql`
  query testPageQuery {
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

