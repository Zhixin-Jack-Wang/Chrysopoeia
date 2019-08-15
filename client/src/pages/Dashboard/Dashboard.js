import React, { Component } from "react";
import Axios from "axios";
import { Link, Route, Redirect } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootswatch/dist/journal/bootstrap.min.css";
import styled from "styled-components";
import Nav from "../../components/Navbar";
import Title from "../../components/Title";
import Item from "../../components/Item";
import Modal from "../../components/Modal";
import { GiBoatFishing } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { userLogin } from "../../store/actions/authActions.js";
class Dashboard extends Component {
  state = {
    catalogue: []
  };

  sortArr = arr => {
    arr.sort((a, b) => {
      let idA = a._id;
      let idB = b._id;
      if (idA < idB) return 1;
      if (idA > idB) return -1;
      return 0;
    });
    return arr;
  };

  componentDidMount() {
    //delete later
    const body = {
      email: "jack@gmail.com",
      password: "123456"
    };
    this.props.userLogin(body);
    setTimeout(() => {
      this.setState({ catalogue: this.props.catalogue });
    }, 1000);
  }

  searchHandler = () => {
    this.setState({
      catalogue: this.props.catalogue.filter(e =>
        e.pname.toUpperCase().includes(this.bar.value.toUpperCase())
      )
    });
    this.bar.value = "";
  };

  keyUpHandler = event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      this.btn.click();
    }
  };

  render() {
    return (
      <>
        <Nav />

        <ItemWrapper className="py-5">
          <div className="container">
            <Title name="Browse" title="Catalogue" />
            <SearchWrapper>
              <div className="search">
                <span className="search-icon">
                  <GiBoatFishing />
                </span>
                <input
                  ref={bar => (this.bar = bar)}
                  type="text"
                  className="search-bar"
                  onKeyUp={this.keyUpHandler}
                />
                <Button
                  variant="primary"
                  ref={btn => (this.btn = btn)}
                  className="search-btn"
                  onClick={this.searchHandler}
                >
                  Search
                </Button>
              </div>
            </SearchWrapper>
            <div className="row">
              {this.sortArr(this.state.catalogue).map(e => {
                return (
                  <Item key={e._id} {...e} item={e} user={this.props.user} />
                );
              })}
            </div>
          </div>
        </ItemWrapper>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  catalogue: state.auth.catalogue
});
export default connect(
  mapStateToProps,
  { userLogin }
)(Dashboard);

const ItemWrapper = styled.section``;
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content:center .search {
    width: 45%;
    position: relative;
    margin-top: 1rem;
    margin-bottom: 3rem;
    &-bar {
      width: 75%;
      padding-left: 2.5rem;
    }
    &-icon {
      position: absolute;
      color: var(--mainBlue);
      left: 1rem;
      font-size: 1.2rem;
    }
    &-btn {
      padding: 0.18rem 1rem;
      margin-left: 1rem;
      background-color: var(--lightBlue);
      border: none;
    }
  }
`;
