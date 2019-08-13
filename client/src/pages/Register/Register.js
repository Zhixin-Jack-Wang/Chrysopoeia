import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootswatch/dist/journal/bootstrap.min.css";
import styled from "styled-components";
import logo from "../../assets/Icon.png";

class Register extends Component {
  state = {
    isRegistered: false,
    msg: ""
  };
  componentDidMount() {}

  renderRedirect = () => {
    if (this.state.isRegistered)
      return (
        <Redirect
          to={{
            pathname: "/users/login"
          }}
        />
      );
  };

  formSubmit = e => {
    e.preventDefault();
    const p1 = this.form.password1.value;
    const p2 = this.form.password2.value;
    const email = this.form.email.value;
    const name = this.form.name.value;
    console.log(p1);
    console.log(p2);
    console.log(email);
    console.log(name);

    //validation
    // if (email === "" || p1 === "" || p2 === "" || name === "") {
    //   this.setState({
    //     msg: "Error : Please enter all fields!"
    //   });
    // } else if (p1 !== p2) {
    //   this.setState({
    //     msg: "Error : The passwords you entered do not  match!"
    //   });
    // } else {
    const body = {
      name: name,
      email: email,
      password: p1,
      password2: p2
    };
    Axios.post("/users/register", body).then(response => {
      console.log(response);
      if (response.data === "already registered") {
        console.log("already registered");
      } else this.setState({ isRegistered: true });
    });
    console.log("registered");
    // }
  };

  render() {
    return (
      <SectionWrapper>
        {this.renderRedirect()}
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <DivWrapper>
                <img src={logo} className="logo" />
                <h1 className="text-center mb-3 title">Register</h1>
              </DivWrapper>

              {/* <% include ./partials/messages %> */}
              <form ref={form => (this.form = form)} onSubmit={this.formSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    // value="<%= typeof name != 'undefined' ? name : '' %>"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    // value="<%= typeof email != 'undefined' ? email : '' %>"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password1">Password</label>
                  <input
                    type="password"
                    id="password1"
                    name="password1"
                    className="form-control"
                    placeholder="Create Password"
                    // value="<%= typeof password != 'undefined' ? password : '' %>"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    // value="<%= typeof password2 != 'undefined' ? password2 : '' %>"
                  />
                </div>

                {this.state.msg === "" || (
                  <div className="msg-holder">
                    <div>{this.state.msg}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-secondary btn-block buttons"
                >
                  Register
                </button>
              </form>
              <p className="lead mt-4">
                Have An Account? <a href="/users/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }
}
export default Register;
const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  .logo {
    width: 4rem;
  }
  .title {
    align-self: center;
  }
`;
const SectionWrapper = styled.section`
  .buttons {
    background-color: var(--lightBlue);
    border: none;
  }

  .msg-holder {
    width: 100%;
    border: 2px red solid;
    color: red;
    background-color: #ffec99;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
