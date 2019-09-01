const path = require(`path`)
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const instructionTemplate = path.resolve(`src/templates/instruction-template.js`)
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: instructionTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}