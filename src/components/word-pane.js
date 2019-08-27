import './word-pane.scss'
import React from 'react'
import { Box, Text } from 'grommet'
import Select from 'react-select';
import Creatable from 'react-select/creatable';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

export default class WordPane extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: this.defaultOptions(),
      value: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.defaultOptions = this.defaultOptions.bind(this)
    this.test = this.test.bind(this)
  }

  defaultOptions () {
    return this.props.word.alternatives.map(word => createOption(word))
  }

  handleChange (selectedOption) {
    this.setState({ value: selectedOption });
  }

  componentDidMount () {
    this.setState({
      value: createOption(this.props.word.default)
    })
  }

  test (inputValue) {
    const { options } = this.state;
    const newOption = createOption(inputValue);

    this.setState({
      options: [...options, newOption],
      value: newOption,
    });
  }

  render () {
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
            >{this.props.num}</Text>
          </Box>
          <Box fill={true}>
            <Creatable
              value={this.state.value}
              // defaultValue={this.state.options[0]}
              // defaultValue={this.props.word.default}
              onChange={this.handleChange}
              onCreateOption={this.test}
              options={this.state.options}
            />
          </Box>
        </Box>
      </Box>
    )
  }
}


