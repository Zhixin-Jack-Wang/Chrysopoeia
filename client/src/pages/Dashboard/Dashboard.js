import React, { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootswatch/dist/journal/bootstrap.min.css";
import styled from "styled-components";
import Nav from "../../components/Navbar";
import Title from "../../components/Title";
import Item from "../../components/Item";

import { connect } from "react-redux";

import { userLogin, resetScroll } from "../../store/actions/authActions.js";
class Dashboard extends Component {
  state = {
    catalogue: [],
    scrollPosition: {}
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
      window.scrollTo(0, this.props.scroll);
    }, 1000);
  }

  searchHandler = value => {
    window.scrollTo(0, 0);
    this.setState({
      catalogue: this.props.catalogue.filter(e =>
        e.pname.toUpperCase().includes(value.toUpperCase())
      )
    });
  };
  componentWillUnmount() {
    this.props.resetScroll(window.pageYOffset);
  }

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
  catalogue: state.auth.catalogue,
  scroll: state.auth.scroll
});
export default connect(
  mapStateToProps,
  { userLogin, resetScroll }
)(Dashboard);

const ItemWrapper = styled.section``;
