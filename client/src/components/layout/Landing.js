import React, { useState } from "react";
import { Button, Label, Input, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import axios from "axios";
function Landing() {
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
    if (password !== "password") {
      console.log("Passwords do not match", "danger");
    } else {
      console.log(formData);
    }
  };
  return (
    <div>
      <section className="landing">
        <div className="landing-inner">
          <section className="font-body">
            <h1 className="display-3">Built by developers</h1>
            <p className="lead">for developers</p>
          </section>
          <Card>
            <CardBody>
              <h3 className="text-center">Register Now</h3>
              <form onSubmit={e => onSubmit(e)}>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                  required
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
                  required
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
                  required
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
        </div>
      </section>
    </div>
  );
}

export default Landing;
