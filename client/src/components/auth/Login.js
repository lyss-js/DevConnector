import React, { useState } from "react";
import { Button, Label, Input, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Landing from "../layout/Landing";
function Login() {
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
  const format = {
    display: "flex",
    justifyContent: "center",
    marginTop: "15%"
  };
  const cardWidth = {
    width: "30%"
  };

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    const newUser = {
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
  return (
    <div style={format}>
      <Card style={cardWidth}>
        <CardBody>
          <h3 className="text-center">Sign in to DeVConnection</h3>
          <form onSubmit={e => onSubmit(e)}>
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
            <div style={center}>
              <Button
                type="submit"
                color="success"
                value="Login"
                style={center}
              >
                Sign In
              </Button>
            </div>
            <p className="disclaimer text-center">
              Don't have an account?{" "}
              <Link to="/" component={Landing}>
                Register Now
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
