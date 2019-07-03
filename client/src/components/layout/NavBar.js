import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Landing from "./Landing";
import Register from "../auth/Register";
import Login from "../auth/Login";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(props) {
    const {
      auth: { isAuthenticated, loading, user },
      logout
    } = this.props;
    const authLinks = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret />
        <DropdownMenu right>
          <DropdownItem>
            <NavLink tag={Link} onClick={logout} to="/">
              Logout
            </NavLink>
          </DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
    const guestLinks = (
      <NavLink tag={Link} to="/login">
        Login
      </NavLink>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/" component={Landing}>
            <i className="fa fa-code" />
            DeVConnection
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!loading && (
                <span>{isAuthenticated ? authLinks : guestLinks}</span>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

/* <nav class="navbar bg-dark">
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <Link to="/register" component={Register}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/register" component={Login}>
            Login
          </Link>{" "}
        </li>
      </ul>
    </nav>
    */
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
