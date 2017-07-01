/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';

export default class FeaturePage extends React.Component {

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Feature Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <h1>Features</h1>
      </div>
    );
  }
}
