import './layout.css'
import './layout.scss'
import React, { useReducer, useEffect, useState } from 'react'
import { Grommet } from 'grommet'
import Navbar from '../components/navbar'
import { AppProvider } from '../app-context'

// shape the option so that it works with the select fields
const createOption = (label, num, isInitial) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  custom: !isInitial,
  num
});

const Layout = ({ children, location, data }) => {

  const initialState = {
    setupPage: 0,
    matrixPage: 0,
    wordOptions: data.allWordsYaml.nodes.map(({word, num}) => word.alternatives.map(a => createOption(a, num, true))),
    defaultValues: data.allWordsYaml.nodes.map(({word, num}, i) => createOption(word.default, num, true))
  }

  const reducer = (state, { payload, type }) => {
    switch (type) {
      case 'set_defaults':
        return { ...state, defaultValues: payload }
      case 'change_revision_page':
        return { ...state, setupPage: state.setupPage + payload }
      case 'change_matrix_page':
        console.log(`hello`)
        console.log(payload)
        console.log(state.matrixPage)
        return { ...state, matrixPage: state.matrixPage + payload }
      case 'change':{
        const defaultValues = state.defaultValues.slice()
        defaultValues[payload.num] = payload.val
        localStorage.setItem('default-values', JSON.stringify(defaultValues))
        return { ...state, defaultValues }
      }
      case 'create': {
        const newOption = createOption(payload.val, payload.num)
        const defaultValues = state.defaultValues.slice()
        defaultValues[payload.num] = newOption
        localStorage.setItem('default-values', JSON.stringify(defaultValues))
        return { ...state, defaultValues }
      }
      default:
        return state
    }
  }

  let [appState, dispatch] = useReducer(reducer, initialState)
  let [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    if (!localStorage.hasOwnProperty('default-values')) {
      localStorage.setItem('default-values', JSON.stringify(initialState.defaultValues))
    }

    let defaultValues = localStorage.getItem('default-values')

    try {
      initialState.defaultValues = JSON.parse(defaultValues)
      dispatch({ type: 'set_defaults', payload: initialState.defaultValues})
    } catch (err) {
      console.error('Could not parse the default values from localStorage')
    }

  }, [])


  if (!ready) return null

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
              fontFamily: 'sans-serif',
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
