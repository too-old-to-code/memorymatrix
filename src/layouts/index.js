import './layout.css'
import './layout.scss'
import React, { useState, useReducer } from 'react'
import { Grommet } from 'grommet'
import Navbar from '../components/navbar'
import { AppProvider } from '../app-context'
// import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children, location }) => {
  let [page, changePage] = useState(0)
  let [revisionPage, changeRevisionPage] = useState(0)

  const initialState = {
    revisionPage: 0,
    matrixPage: 0
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change_revision_page':
        return { ...state, revisionPage: state.revisionPage + action.payload }
      case 'change_matrix_page':
        return { ...state, matrixPage: state.matrixPage + action.payload }
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