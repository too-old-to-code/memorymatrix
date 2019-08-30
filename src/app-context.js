import React from 'react'

const AppContext = React.createContext({
  appState: {},
  dispatch: () => {}
})

export const AppProvider = AppContext.Provider
export const AppConsumer = AppContext.Consumer
export default AppContext