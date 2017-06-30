import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
      <section>
        <p>&copy; Copyright Brian Cappello {new Date().getFullYear()}</p>
      </section>
    )).toBe(true);
  });
});
