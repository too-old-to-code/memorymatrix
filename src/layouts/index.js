import './layout.css'
import './layout.scss'
import React, { useState, useReducer } from 'react'
import { Grommet } from 'grommet'
import Navbar from '../components/navbar'
import { AppProvider } from '../app-context'
// import { useStaticQuery, graphql } from "gatsby"
import { graphql } from 'gatsby'

const createOption = (label, num, isInitial) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  custom: !isInitial,
  num
});

const Layout = ({ children, location, data }) => {
  let [page, changePage] = useState(0)
  let [revisionPage, changeRevisionPage] = useState(0)

  const initialState = {
    revisionPage: 0,
    matrixPage: 0,
    // words: data.allWordsYaml.nodes,
    wordOptions: data.allWordsYaml.nodes.map(({word, num}) => word.alternatives.map(a => createOption(a, num, true))),
    defaultValues: data.allWordsYaml.nodes.map(({word, num}, i) => createOption(word.default, num, true))
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change_revision_page':
        return { ...state, revisionPage: state.revisionPage + action.payload }
      case 'change_matrix_page':
        return { ...state, matrixPage: state.matrixPage + action.payload }
      case 'change':{
        const defaultValues = state.defaultValues.slice()
        defaultValues[action.payload.num] = action.payload.val
        return {
          ...state,
          defaultValues
        }
      }
      case 'create': {
        const newOption = createOption(action.payload.val, action.payload.num)
        const defaultValues = state.defaultValues.slice()
        defaultValues[action.payload.num] = newOption
        return {
          ...state,
          defaultValues
        }
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

// export const query = graphql`
//   query layoutPageQuery {
//     allWordsYaml {
//       nodes {
//         num
//         word {
//           alternatives
//           default
//         }
//       }
//     }
//   }
// `