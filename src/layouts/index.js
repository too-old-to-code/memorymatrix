import './layout.css'
import './layout.scss'
import React from 'react'
import { Grommet } from 'grommet'
import Navbar from '../components/navbar'
// import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
    <Grommet
      theme={{
        global: {
          font: {
            family: 'sans-serif'
          },
          colors: {
            navbar: 'brand',
            brand: 'orange'
          }
        },
        // anchor: {
        //   textDecoration: 'none'
        // },
        text: {
          extend: {
            fontFamily: 'sans-serif'
          }
        },
        button: {
          border: {
            radius: 0
          }
        }
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          // maxWidth: 960,
          // padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
          overflow: 'hidden'
        }}
      >
        <Navbar />
        <main style={{marginTop: '60px'}}
        >{children}</main>
      </div>
    </Grommet>
    </>
  )
}

export default Layout