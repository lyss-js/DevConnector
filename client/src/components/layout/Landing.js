import React, { useState } from "react";
import { Button, Label, Input, Card, CardBody, Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Login from "../auth/Login";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Landing = props => {
  const margin = { marginTop: 15 };
  const center = {
    textAlign: "center",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%"
  };
  const smallFont = {
    fontSize: "0.8rem"
  };
  const container = {
    height: "100vh"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password.length < 6) {
      props.setAlert("Password invalid", "danger");
    } else {
      props.register({ name, email, password });
    }
    const newUser = {
      name,
      email,
      password
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/users", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container landing">
      <Row>
        <Col lg={6}>
          <img src="https://whatif-assets-cdn.s3.amazonaws.com/images/home-illo-team-3.svg" />
        </Col>
        <Col lg={6}>
          <Card>
            <CardBody>
              <h3 className="text-center">Register Now</h3>
              <form onSubmit={e => onSubmit(e)}>
                <Label for="username">Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
                <Label for="email" style={margin}>
                  Email
                </Label>
                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
                <Label for="password" style={margin}>
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
                <p style={smallFont}>
                  Make sure it's at least 8 characters including a number and a
                  lowercase letter
                </p>
                <div style={center}>
                  <Button type="submit" color="success" style={center}>
                    Register to DevConnection
                  </Button>
                </div>
                <p className="disclaimer text-center">
                  Already have an account?{" "}
                  <Link to="/login" component={Login}>
                    Login
                  </Link>
                </p>
                <p className="disclaimer">
                  By clicking “Sign up for DevConnection, you agree to our Terms
                  of Service and Privacy Statement. We’ll occasionally send you
                  account related emails.
                </p>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Landing);
