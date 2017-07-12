import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import { COPYRIGHT } from 'config'

import './footer.scss'

function Footer() {
  return (
    <footer>
      <Grid>
        <Row>
          <Col xs={12}>
            <p className="center-text">
              &copy; {COPYRIGHT} {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Grid>
    </footer>
  )
}

export default Footer
