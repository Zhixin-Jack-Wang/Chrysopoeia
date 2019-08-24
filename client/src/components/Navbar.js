import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Icon.png";
import { ButtonContainer } from "./styled/Button";
import { FaSignOutAlt, FaWindows } from "react-icons/fa";
import { GiChest } from "react-icons/gi";
import { logOut, resetScroll } from "../store/actions/authActions.js";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GiBoatFishing } from "react-icons/gi";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { SectionWrapper, Nav, SearchWrapper } from "./styled/NavWrapper";
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
            {/* <Link to="/users/dashboard" className="nav-link">
              <span className="ctlg">Catalogue</span>
            </Link> */}
            <div className="btn-wrapper">
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
                    <FaSignOutAlt />
                  </span>
                  logout
                </ButtonContainer>
              </div>
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
            <div className="btn-group">
              <ButtonGroup>
                <button className="btn-me" onClick={this.props.invButtonClick}>
                  Inventory
                </button>
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
            </div>
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
