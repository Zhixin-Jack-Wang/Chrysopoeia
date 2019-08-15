import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Icon.png";
import { ButtonContainer } from "./Button";
import { FaSignOutAlt } from "react-icons/fa";
import { GiChest } from "react-icons/gi";
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    const { name, email, inventory } = this.props.user;
    return (
      <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
        <Link
          to={{
            pathname: "/users/dashboard",
            state: {
              email: email,
              userName: name
            }
          }}
        >
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link
              to={{
                pathname: "/users/dashboard",
                state: {
                  email: email,
                  userName: name
                }
              }}
              className="nav-link"
            >
              <span className="ctlg">Catalogue</span>
            </Link>
          </li>
        </ul>
        <Link
          to={{
            pathname: "/users/mystuff"
            // state: {
            //   ...this.props
            // }
          }}
          className="ml-auto"
        >
          <ButtonContainer>
            <span className="mr-2">
              <GiChest />
            </span>
            {`${name}'s`} stuffs
          </ButtonContainer>
        </Link>

        <Link
          to={{
            pathname: "/users/login",
            state: {
              userEmail: email,
              userName: name
            }
          }}
          className="ml-auto"
          id="logout-btn"
        >
          <ButtonContainer>
            <span className="mr-2">
              <i className="fa fa-sign-out-alt" />
              <FaSignOutAlt />
            </span>
            logout
          </ButtonContainer>
        </Link>
      </Nav>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(Navbar);
const Nav = styled.nav`
  background: var(--mainYellow);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  .ctlg{
    
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;
