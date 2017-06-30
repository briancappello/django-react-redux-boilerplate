/*
 * HomePage
 */

import React from 'react';
import Helmet from 'react-helmet';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <h1>Home</h1>
        </div>
      </article>
    );
  }
}

export default HomePage
