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
    // const body = {
    //   email: "jack@gmail.com",
    //   password: "123456"
    // };
    // this.props.userLogin(body);
    setTimeout(() => {
      this.setState({ catalogue: this.props.catalogue });
    }, 1000);
  }

  searchHandler = value => {
    this.setState({
      catalogue: this.props.catalogue.filter(e =>
        e.pname.toUpperCase().includes(value.toUpperCase())
      )
    });
  };

  render() {
    return (
      <>
        <Nav searchBar={true} searchHandler={this.searchHandler} />

        <ItemWrapper className="py-5">
          <div className="container">
            <Title name="Browse" title="Catalogue" />
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
