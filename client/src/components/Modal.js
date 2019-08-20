import React, { Component } from "react";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { mkOffer } from "../store/actions/authActions.js";
class Modal extends Component {
  state = {
    modalOpen: true
  };
  componentDidMount() {
    this.setState({ modalOpen: true });
  }
  selectHandler = e => {
    // this.setState({modalOpen:this.state.modalOpen});
    this.drop.title = e.target.innerHTML;
    this.drop.firstChild.innerHTML = e.target.innerHTML;
  };

  makeAnOffer = (inv, ownername, myname, tItem, owneremail, useremail) => {
    let amount = this.input.value;
    if (!amount) {
      amount = 0;
    }

    const money = {
      amount,
      payerEmail: useremail
    };
    const itemname = this.drop.title;
    const item = inv.filter(e => e.pname === itemname)[0];
    const reEmail = owneremail;
    const inEmail = useremail;
    const body = {
      inEmail,
      reEmail,
      initiator: myname,
      receiver: ownername,
      moneyoffer: money,
      itemoffer: item,
      targetItem: tItem
    };

    this.props.mkOffer(body);
  };

  updateOffer = () => {};
  render() {
    const {
      item,
      user,
      pname,
      img,
      expect,
      mode,
      description,
      ownername,
      owneremail,
      updateUser
    } = this.props;
    if (!this.state.modalOpen) return null;
    else
      return (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                className=" mx-auto  col-md-6 col-lg-4 p-5 text-center text-capitalize"
                id="modal"
              >
                <h1>{pname}</h1>
                {/* <img src={img} className="img-fluid" alt="" /> */}
                <h5 className="text-muted">posted by:{`  ${ownername}`}</h5>
                <h5>Exchange for : {expect} </h5>
                <br />
                <Form.Label className="money-label">Item Offer</Form.Label>
                <DropdownButton
                  ref={drop => {
                    this.drop = drop;
                  }}
                  id="dropdown-basic-button"
                  title="Select From My Inventory"
                >
                  {user.inventory.map(e => (
                    <Dropdown.Item key={e._id} onClick={this.selectHandler}>
                      {e.pname}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <br />
                <Form.Label className="money-label">Money Offer</Form.Label>
                <Form.Control
                  ref={input => (this.input = input)}
                  type="number"
                  placeholder="0"
                />
                <br />

                <ButtonContainer
                  cart
                  onClick={() => {
                    this.makeAnOffer(
                      user.inventory,
                      ownername,
                      user.name,
                      item,
                      owneremail,
                      user.email
                    );
                    this.setState({ modalOpen: false });
                    this.props.closeModal();
                  }}
                >
                  Confirm
                </ButtonContainer>
                <ButtonContainer
                  cart
                  onClick={() => {
                    this.setState({ modalOpen: false });
                    this.props.closeModal();
                  }}
                >
                  Back
                </ButtonContainer>
              </div>
            </div>
          </div>
        </ModalContainer>
      );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(
  mapStateToProps,
  { mkOffer }
)(Modal);

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;

  #modal {
    background: var(--mainWhite);
  }
  #dropdown-basic-button {
    background-color: var(--lightBlue);
    border: none;
  }
  .money-label {
    font-weight: bold;
  }
`;
