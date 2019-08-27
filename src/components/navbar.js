import React from 'react'
import { Box, Layer } from 'grommet'
import cx from 'classnames'
import NavMenu from './navmenu'

const Navbar = () => {
  const [show, setShow] = React.useState();
  return (
    <>
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
      justify='between'
      background='navbar'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      className='navbar'
    >

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


export default Navbar
