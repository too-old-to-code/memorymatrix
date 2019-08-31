import React, { useContext } from 'react'
import { Box, Text } from 'grommet'
import Creatable from 'react-select/creatable';
import AppContext from '../app-context'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'grey',
  })
}

const WordPane = ({ num, word }) => {
  const {appState, dispatch} = useContext(AppContext)

  return (
    <Box
      background="light-1"
      pad="small"
      justify="around"
      fill={true}
    >
      <Box
        background="#6573af"
        direction="row"
        align-content="stretch"
        align="center"
        gap="medium"
        pad="medium"
        justify="around"
      >
        <Box
          justify="center"
          direction="row"
          pad={{
            "vertical": "xsmall",
            "horizontal": "medium"
          }}
          width="xxsmall"
        >
          <Text
            size="xxlarge"
          >{num}</Text>
        </Box>
        <Box fill={true} >
          <Creatable
            hideSelectedOptions={true}
            styles={customStyles}
            escapeClearsValue={true}
            value={appState.defaultValues[num]}
            onChange={(val) => dispatch({ type: 'change', payload: { val, num }})}
            onCreateOption={(val) => dispatch({ type: 'create', payload: { val, num }})}
            options={appState.wordOptions[num]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default WordPane