import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Layer, Text } from 'grommet'
import cx from 'classnames'
import NavMenu from './navmenu'
import { FormNext, FormPrevious } from 'grommet-icons'
import Helmet from 'react-helmet'
import AppContext from '../app-context'

const matrixPageRegex = /.?setup.?/
const setupPageRegex = /.?matrix.?/

const Navbar = ({location}) => {
  const [show, setShow] = React.useState();
  const { appState, dispatch } = useContext(AppContext)

  return (
    <>
    <Helmet title="Memory-matrix" />
    <Box align='center' justify="center" width="36px" height="100%" style={{position: 'fixed', zIndex: 100, top: 0, left: 0, height: '60px', width: '50px'}}>
      <button
        className={cx('hamburger hamburger--spin', {'is-active': show})}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
        onClick={() => setShow(!show)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </Box>
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='end'
      background='navbar'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      className='navbar'
    >
      {
        setupPageRegex.test(location) && <Box
          direction="row"
          align="center"
        >
          <Box width="40px">
          {
            appState.matrixPage >= 10 && <FormPrevious
              color="white"
              style={{width: '40px', height: '35px'}}
              onClick={() => dispatch({type: 'change_matrix_page', payload: -10})}
            />
          }
          </Box>
          <Text size="large" color="white">{appState.matrixPage}-{appState.matrixPage + 9}</Text>
          <Box width="40px">
          {
            appState.matrixPage <= 89 && <FormNext
              color="white"
              style={{width: '40px', height: '35px'}}
              onClick={() => dispatch({type: 'change_matrix_page', payload: 10})}
            />
          }
          </Box>
        </Box>
      }
      {
        matrixPageRegex.test(location) && <Box
          direction="row"
          align="center"
        >
          <Box width="40px">
          {
            appState.setupPage >= 24 && <FormPrevious
              color="white"
              style={{width: '40px', height: '35px'}}
              onClick={() => dispatch({type: 'change_revision_page', payload: -25})}
            />
          }
          </Box>
          <Text size="large" color="white">{appState.setupPage}-{appState.setupPage + 24}</Text>
          <Box width="40px">
          {
            appState.setupPage <= 74 && <FormNext
              color="white"
              style={{width: '40px', height: '35px'}}
              onClick={() => dispatch({type: 'change_revision_page', payload: 25})}
            />
          }
          </Box>
        </Box>
      }

    </Box>
      {show && (
        <Layer
          animation="fadeIn"
          onEsc={() => setShow(false)}
          full={true}
          onClickOutside={() => {}}
          responsive={false}
          plain

        >
          <NavMenu handleClick={setShow}/>
        </Layer>
      )}
      </>
  )
}

Navbar.propTypes = {
  location: PropTypes.string
}

export default Navbar
