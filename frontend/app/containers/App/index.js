/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import Helmet from 'react-helmet'

import { Grid } from 'react-bootstrap'

import Header from 'components/Header'
import Footer from 'components/Footer'
import withProgressBar from 'components/ProgressBar'
import { BRAND } from 'config'

export function App(props) {
  return (
    <div>
      <Helmet
        titleTemplate={`%s - ${BRAND}`}
        defaultTitle={BRAND}
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header />
      <Grid>
        {React.Children.toArray(props.children)}
      </Grid>
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.node,
}

export default withProgressBar(App)
