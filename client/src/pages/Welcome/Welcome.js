import React, { Component } from "react";
import Axios from "axios";
import { Link, Route, Redirect } from "react-router-dom";
import logo from "../../assets/Icon.png";
import styled from "styled-components";

class Dashboard extends Component {
  render() {
    return (
      <>
        <DivWrapper>
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <div className="card card-body text-center">
                <div className="logo-wrapper">
                  <img src={logo} className="logo" />
                </div>
                <h4>Welcome to Chrysopoeia</h4>
                <p>Create an account or login</p>
                <div className="anchor-wrapper">
                  <Link
                    to="/users/register"
                    className="btn btn-secondary btn-block buttons"
                  >
                    Register
                  </Link>
                  <Link
                    to="/users/login"
                    className="btn btn-secondary btn-block buttons"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DivWrapper>
      </>
    );
  }
}

export default Dashboard;
const DivWrapper = styled.div`
  .logo-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 8rem;
  }

  .buttons {
    width: 50%;
    background-color: var(--lightBlue);
    border: none;
  }
  .anchor-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-btn {
    margin-bottom: 3rem;
  }
`;
