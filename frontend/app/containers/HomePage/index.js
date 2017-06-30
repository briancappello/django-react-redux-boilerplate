/*
 * HomePage
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

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
          <div className="center">
            <h2>
              <FormattedMessage {...messages.startProjectHeader} />
            </h2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </div>
        </div>
      </article>
    );
  }
}

export default HomePage
