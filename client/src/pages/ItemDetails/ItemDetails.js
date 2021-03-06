import React, { Component } from "react";
import { ButtonContainer } from "../../components/styled/Button";
import { Link } from "react-router-dom";
import Nav from "../../components/Navbar";
import Modal from "../../components/Modal";
import styled from "styled-components";
export default class ItemDetails extends Component {
  state = {
    openModal: false
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
      pname,
      img,
      expect,
      mode,
      description,
      ownername,
      item,
      offer,
      status
    } = this.props.location.state;
    return (
      <SectionWrapper>
        <Nav />
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

            <div className="col-12 col-md-6 my-3 text-capitalize">
              {/* <h1>category : nothing yet</h1> */}
              <div className="by">
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  posted by :{" "}
                  <span className="text-uppercase">{ownername}</span>
                </h4>
              </div>
              <h4 className="text-blue">
                <strong>
                  Exchange for : <span> </span>
                  {expect}
                </strong>
              </h4>
              <p className="text-capitalize font-weight-bold mt-3 mb-0">
                description :
              </p>
              <p className="text-muted lead">{description}</p>
              {offer || (
                <div>
                  <Link
                    to={{
                      pathname: "/users/dashboard"
                    }}
                  >
                    <ButtonContainer cart>back to catalogue</ButtonContainer>
                  </Link>
                  <ButtonContainer cart onClick={this.makeoffer}>
                    {"Make an offer"}
                  </ButtonContainer>
                </div>
              )}
              {offer && (
                <div>
                  <Link
                    to={{
                      pathname: "/users/mystuff",
                      state: { offer: true, status: status }
                    }}
                  >
                    <ButtonContainer cart>Back to offer</ButtonContainer>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.renderModal()}
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
    h4 {
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;
