import React, { PropTypes } from 'react'
import { NavDropdown } from 'react-bootstrap'

/**
 * NavLinkAndDropdown
 *
 * A variant of react-bootstrap's NavDropdown where the top-level item
 * is also a link, and the dropdown opens automatically on hover. It
 * shows up as active when its link matches or is the start of the
 * current location's pathname.
 */
export class NavLinkAndDropdown extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired,
  }

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  onClick = () => {
    const { push } = this.context.router
    const { linkTo } = this.props
    push(linkTo)
  }

  isActive = (path) => {
    const { location: { pathname } } = this.context.router
    return pathname && pathname.indexOf(path) === 0
  }

  render() {
    const { children, linkTo, ...props } = this.props
    return (
      <NavDropdown onClick={this.onClick}
                   onMouseEnter={() => this.setState({ isOpen: true })}
                   onMouseLeave={() => this.setState({ isOpen: false })}
                   onToggle={() => { /* required prop to silence bs warning */ }}
                   open={this.state.isOpen}
                   noCaret
                   {...props}
                   active={this.isActive(linkTo)}
      >
        {children}
      </NavDropdown>
    )
  }
}

export default NavLinkAndDropdown
