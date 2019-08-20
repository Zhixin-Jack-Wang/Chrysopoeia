import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Icon.png";
import { ButtonContainer } from "./Button";
import { FaSignOutAlt, FaWindows } from "react-icons/fa";
import { GiChest } from "react-icons/gi";
import { logOut, resetScroll } from "../store/actions/authActions.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GiBoatFishing } from "react-icons/gi";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
class Navbar extends Component {
  renderRedirect = () => {
    if (!this.props.isLogin) return <Redirect to="/users/login" />;
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.searchHandler(this.bar.value);
    this.bar.value = "";
  };
  dropDownHandler = e => {
    e.preventDefault();
    const target = e.target.innerHTML;
    this.drop.title = target;
    this.drop.firstChild.innerHTML = target;
    const oft = target[0].toLowerCase() + target.slice(1);
    this.props.selectHandler(oft);
  };
  render() {
    const { name } = this.props.user;
    return (
      <SectionWrapper>
        <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
          {this.renderRedirect()}
          <div className="wrapper">
            <Link
              to="/users/dashboard"
              onClick={() => {
                window.scrollTo(0, 0);
                this.props.resetScroll(0);
              }}
            >
              <img src={logo} alt="logo" className="navbar-brand" />
            </Link>
            <Link to="/users/dashboard" className="nav-link">
              <span className="ctlg">Catalogue</span>
            </Link>
            <Link to="/users/mystuff" className="mystuff-link">
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
          </div>
          {this.props.searchBar && (
            <SearchWrapper>
              <div className="search">
                <span className="search-icon">
                  <GiBoatFishing />
                </span>
                <form onSubmit={this.submitHandler} className="search-form">
                  <input
                    ref={bar => (this.bar = bar)}
                    type="text"
                    className="search-bar"
                    placeholder="Type here to search..."
                  />
                  <button
                    type="submit"
                    variant="primary"
                    ref={btn => (this.btn = btn)}
                    className="search-btn"
                  >
                    Search
                  </button>
                </form>
              </div>
            </SearchWrapper>
          )}
          {this.props.myStuff && (
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                className="btn-me"
                onClick={this.props.invButtonClick}
              >
                Inventory
              </Button>
              <DropdownButton
                ref={drop => {
                  this.drop = drop;
                }}
                id="dropdown-basic-button"
                title="Offers"
              >
                {this.props.offer.map((e, index) => (
                  <Dropdown.Item key={index} onClick={this.dropDownHandler}>
                    {e}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </ButtonGroup>
          )}
        </Nav>
        <div className="spacer" />
      </SectionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLogin: state.auth.isLogin
});

export default connect(
  mapStateToProps,
  { logOut, resetScroll }
)(Navbar);

const SectionWrapper = styled.section`
  .spacer {
    width: 100%;
    height: 4rem;
  }
`;
const Nav = styled.nav`
  width: 100%;
  background: var(--mainYellow);
  .navbar-brand {
    @media (max-width: 768px) {
      width: 4rem;
      height: 4rem;
    }
  }

  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mystuff-link {
    }
  }
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    z-index: 2;
    .navbar-nav {
      flex-direction: row !important;
    }
  }
`;
const SearchWrapper = styled.div`
  width: 100%;
  justify-content: center;

  .search {
    width: 100%;
    position: relative;
    &-form {
      display: flex;
      justify-content: space-between;
    }
    &-bar {
      padding-left: 2.5rem;
      border: 0.05rem solid var(--mainWhite);
      border-radius: 5px;
    }
    &-icon {
      position: absolute;
      color: var(--mainBlue);
      left: 1rem;
      font-size: 1.2rem;
    }
    &-btn {
      padding: 0.18rem 1rem;
      color: var(--mainWhite);
      background-color: var(--lightBlue);
      border-radius: 5px;
      border: none;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
      &:hover {
        color: black;
      }
    }
  }
`;
