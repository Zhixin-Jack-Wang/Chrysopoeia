import React, { Component } from "react";
import { ButtonContainer } from "../../components/Button";
import { Link } from "react-router-dom";
import Nav from "../../components/Navbar";
import Modal from "../../components/Modal";
import styled from "styled-components";
export default class MyItemDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  state = {
    openModal: false
  };
  makeoffer = () => {
    this.setState({ openModal: true });
  };
  closeModal = () => {
    this.setState({ openModal: false });
  };
  renderModal = () => {
    if (this.state.openModal)
      return (
        <Modal {...this.props.location.state} closeModal={this.closeModal} />
      );
  };
  render() {
    const {
      user,
      pname,
      img,
      expect,
      mode,
      description
    } = this.props.location.state;

    return (
      <SectionWrapper>
        <Nav {...user} />
        <div className="container py-5">
          <div className="row">
            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
              <h1 className="title">{pname}</h1>
            </div>
          </div>
          {/* end of title */}
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <img src={img} className="img-fluid" alt="" />
            </div>
            {/* prdoduct info */}
            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
              {/* <h1>category : nothing yet</h1> */}
              <div className="by">
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  posted by :{" "}
                  <span className="text-uppercase">{user.name}</span>
                </h4>
              </div>
              <h4 className="text-blue">
                <span>Exchange for : </span>
                <strong>{expect}</strong>
              </h4>
              <p className="text-capitalize font-weight-bold mt-3 mb-0">
                description :
              </p>
              <p className="text-muted lead">{description}</p>
              <div>
                <Link
                  to={{
                    pathname: "/users/mystuff",
                    state: {
                      ...user
                    }
                  }}
                >
                  <ButtonContainer cart>back to mystuff</ButtonContainer>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }
}

const SectionWrapper = styled.section`
  .title {
    font-family: var(--fontCinzel);
    color: var(--mainDark);
  }
  .by {
    margin-bottom: 2rem;
  }
`;
