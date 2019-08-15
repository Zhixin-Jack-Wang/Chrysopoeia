import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Icon.png";
import { ButtonContainer } from "./Button";
import { FaSignOutAlt } from "react-icons/fa";
import { GiChest } from "react-icons/gi";
import { logOut } from "../store/actions/authActions.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Navbar extends Component {
  renderRedirect = () => {
    if (!this.props.isLogin) return <Redirect to="/users/login" />;
  };
  render() {
    const { name } = this.props.user;
    return (
      <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
        {this.renderRedirect()}
        <Link to="/users/dashboard">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/users/dashboard" className="nav-link">
              <span className="ctlg">Catalogue</span>
            </Link>
          </li>
        </ul>
        <Link to="/users/mystuff" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <GiChest />
            </span>
            {`${name}'s`} stuffs
          </ButtonContainer>
        </Link>
        <div onClick={() => this.props.logOut()}>
          <ButtonContainer>
            <span className="mr-2">
              <i className="fa fa-sign-out-alt" />
              <FaSignOutAlt />
            </span>
            logout
          </ButtonContainer>
        </div>
      </Nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLogin: state.auth.isLogin
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);

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
