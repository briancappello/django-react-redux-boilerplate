import React from 'react';

import LocaleToggle from 'containers/LocaleToggle';

function Footer() {
  return (
    <div>
      <section>
        <p>&copy; Copyright Brian Cappello {new Date().getFullYear()}</p>
      </section>
      <section>
        <LocaleToggle />
      </section>
    </div>
  );
}

export default Footer;
