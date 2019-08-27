import React from "react"
import { Accordion, AccordionPanel, Box } from 'grommet';
import { ChatOption } from 'grommet-icons'
import PanelHeader from '../components/panel-header'
import { graphql } from 'gatsby'

const NumberSounds = ({data}) => {
  const numbers = data.allSoundsYaml.nodes
  const [activeItem, setActiveIcon] = React.useState(null)

  return (
    <Box fill='horizontal'>
      <Accordion
        animate={true}
        multiple={false}
        onActive={([activeNumber]) => setActiveIcon(activeNumber)}
      >
        {
          numbers.map((num) => {
            return (
              <AccordionPanel header={<PanelHeader item={num} active={activeItem}/>} key={num.number}>
                <Box background='light-1' pad="large">{num.description}</Box>
              </AccordionPanel>
            )
          })
        }
      </Accordion>
    </Box>
  )
}

export default NumberSounds

export const query = graphql`
  query soundsPageQuery {
    allSoundsYaml {
      nodes {
        number
        sound
        description
      }
    }
  }
`