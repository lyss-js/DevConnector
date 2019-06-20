import React, { Component } from "react";
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
  NavbarToggler
} from "reactstrap";

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

  render() {
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
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
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

export default NavBar;
