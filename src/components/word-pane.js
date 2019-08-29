// import './word-pane.scss'
import React, { useReducer } from 'react'
import { Box, Text } from 'grommet'
import Creatable from 'react-select/creatable';

const createOption = (label, isInitial) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  custom: !isInitial
});

export default ({ num, word }) => {

  const initialState = {
    options: word.alternatives.map(word => createOption(word, true)),
    value: createOption(word.default)
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change':
        return { ...state, value: action.payload }
      case 'create':
        const newOption = createOption(action.payload)
        state.options = state.options.filter(opt => !opt.custom)
        return {
          ...state,
          options: state.options.concat(newOption),
          value: newOption
        }
      default:
        throw new Error('Unexpected action')
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Box
      background="light-1"
      pad="small"
      justify="around"
      fill={true}
    >
      <Box
        background="light-5"
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
            color="dark-2"
          >{num}</Text>
        </Box>
        <Box fill={true}>
          <Creatable
            escapeClearsValue={true}
            value={state.value}
            onChange={(val) => dispatch({ type: 'change', payload: val})}
            onCreateOption={(val) => dispatch({ type: 'create', payload: val})}
            options={state.options}
          />
        </Box>
      </Box>
    </Box>
  )
}
