import React from 'react'
import { Box, Text } from 'grommet'
import { Link } from 'gatsby'

const MenuItem = (props) => {
  return (
    <Link
      to={props.url} style={{textDecoration: 'none'}}
      onClick={() => props.handleClick(false)}
    >
      <Box
        pad={{ left: 'medium', right: 'small', vertical: 'large' }}
      >
        <Text color="light-2" size="large" weight="bold">{props.label}</Text>
      </Box>
    </Link>
  )
}

const items = [
  { name: 'How to use', url: '/page-2' },
  { name: 'Number sounds', url: '/number-sounds' },
  { name: 'Matrix', url: '/matrix' },
  { name: 'Revision', url: '/revision' },
]

const NavMenu = (props) => {
  return (
    <Box
      pad={{ left: 'medium', right: 'small', vertical: 'large' }}
      background="dark-6"
      fill={true}
      className="app-menu"
    >
      {
        items.map(item => (
          <MenuItem
            url={item.url}
            label={item.name}
            key={item.name}
            handleClick={props.handleClick}
          />
        ))
      }
    </Box>
  )
}

export default NavMenu