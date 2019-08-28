import React from 'react'

const AppContext = React.createContext({
  page: 0,
  matrixPage: 0,
  revisionPage: 0,
  changepage: () => {}
})

export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
export default AppContext