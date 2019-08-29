import './layout.css'
import './layout.scss'
import React, { useState, useReducer } from 'react'
import { Grommet } from 'grommet'
import Navbar from '../components/navbar'
import { AppProvider } from '../app-context'
// import { useStaticQuery, graphql } from "gatsby"
import { graphql } from 'gatsby'

const createOption = (label, isInitial) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  custom: !isInitial
});

const Layout = ({ children, location, data }) => {
  let [page, changePage] = useState(0)
  let [revisionPage, changeRevisionPage] = useState(0)


  const initialState = {
    revisionPage: 0,
    matrixPage: 0,
    words: data.allWordsYaml.nodes,
    other: data.allWordsYaml.nodes.map(s => {

    }),
    test: data.allWordsYaml.nodes.map((s) => {
      return {
        options: s.word.alternatives.map(word => createOption(word, true)),
        default: createOption(s.word.default, true)
      }
    })
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change_revision_page':
        return { ...state, revisionPage: state.revisionPage + action.payload }
      case 'change_matrix_page':
        return { ...state, matrixPage: state.matrixPage + action.payload }
      case 'change':
        const test = state.test.slice()
        test[action.payload.num].default = action.payload.val
        return {
          ...state,
          test
        }
      case 'create':
        const newOption = createOption(action.payload)
        state.options = state.options.filter(opt => !opt.custom)
        return {
          ...state,
          options: state.options.concat(newOption),
          value: newOption
        }
      default:
        return state
    }
  }

  let [appState, dispatch] = useReducer(reducer, initialState)

  return (
    <AppProvider value={{ appState, dispatch }}>
      <Grommet
        theme={{
          global: {
            font: {
              family: 'sans-serif'
            },
            colors: {
              navbar: 'brand',
              brand: 'orange'
            }
          },
          // anchor: {
          //   textDecoration: 'none'
          // },
          text: {
            extend: {
              fontFamily: 'sans-serif'
            }
          },
          button: {
            border: {
              radius: 0
            }
          }
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            // maxWidth: 960,
            // padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            overflow: 'hidden'
          }}
        >
          <Navbar location={location.pathname}/>
          <main style={{marginTop: '60px'}}
          >{children}</main>
        </div>
      </Grommet>
    </AppProvider>
  )
}

export default Layout

export const query = graphql`
  query layoutPageQuery {
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