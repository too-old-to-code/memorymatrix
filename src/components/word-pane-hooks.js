import './word-pane.scss'
import React from 'react'
import { Box, Text } from 'grommet'
import Select from 'react-select';
import Creatable from 'react-select/creatable';


const WordPane = (props) => {
  const [value, setValue] = React.useState(props.word.default)
  const [options, setOptions] = React.useState(defaultOptions)

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });

  const test = (inputValue) => {
    const newOption = createOption(inputValue)

    setOptions([...options, newOption])
    setValue(newOption)
  }

  const defaultOptions = ({word}) => word.alternatives.map(word => createOption(word))

  console.log(value)
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
          >{props.num}</Text>
        </Box>
        <Box fill={true}>
          <Creatable
            value={value}
            onChange={setValue}
            onCreateOption={test}
            options={options}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default WordPane



