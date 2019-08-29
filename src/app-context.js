import React from 'react'

// const AppContext = React.createContext({
//   page: 0,
//   matrixPage: 0,
//   revisionPage: 0,
//   changepage: () => {}
// })

const AppContext = React.createContext({
  appState: {},
  dispatch: () => {}
})

export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
export default AppContext