import React from "react"
import { graphql } from "gatsby"
import { Box, Heading } from 'grommet'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Box
      direction="column"
      fill={true}
      overflow="scroll"
      pad="medium"
    >
      <Heading textAlign="center">{frontmatter.title}</Heading>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
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