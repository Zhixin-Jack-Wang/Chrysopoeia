import React, { Component } from "react";
import Nav from "../../components/Navbar";
import { Card, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import Title from "../../components/Title";
import exg_icon from "../../assets/exchange-icon.png";
import money from "../../assets/money.png";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { GiNinjaHead, GiBatMask } from "react-icons/gi";
import { connect } from "react-redux";
import { setOffer, addConv, getConv } from "../../store/actions/authActions.js";

class OfferDetails extends Component {
  state = {
    conversation: [],
    redirect: false
  };

  setOffer = (userEmail, otherEmail, offerId, status) => {
    const body = {
      userEmail,
      otherEmail,
      offerId,
      status
    };

    this.props.setOffer(body);
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 1000);
  };

  convertDate = iso => {
    const date = new Date(iso);
    let m = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let d = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let hr = date.getHours();
    let ampm = hr > 12 ? "PM" : "AM";
    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;
    const newDate =
      d[date.getDay()] +
      ", " +
      m[date.getMonth() + 1] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      " @ " +
      hr +
      ":" +
      min +
      ":" +
      date.getSeconds() +
      " " +
      ampm;
    return newDate;
  };

  msgHandler = (emailPost, emailReceive, offerId, from) => {
    const message = this.msg.value;

    const body = {
      offerId,
      emailPost,
      emailReceive,
      from,
      message
    };

    this.props.addConv(body);
    setTimeout(() => {
      this.setState({ conversation: this.props.conv });
      this.msg.value = "";
    }, 1000);
  };

  componentDidMount = () => {
    console.log("mount");
    this.setState({
      conversation: this.props.location.state.offer.conversation
    });
  };

  render() {
    console.log({ state: this.state.conversation });
    // console.log({conv: this.props.location.state.offer.conversation});
    const user = this.props.location.state.user;
    const offer = this.props.location.state.offer;
    const status = offer.status;
    return (
      <>
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/users/mystuff",
              state: {
                ...user
              }
            }}
          />
        ) : null}
        <Nav {...user} />
        <br />
        <br />
        {status === "incoming" ? (
          <Title name={`Offer from`} title={`${offer.initiator}`} />
        ) : (
          <Title name={`Offer to`} title={`${offer.receiver}`} />
        )}
        <SectionWrapper>
          {offer.itemoffer ? (
            <Card style={{ width: "30rem" }}>
              <Card.Title className="card-title">
                {offer.itemoffer.pname}
              </Card.Title>
              <Card.Img
                variant="top"
                src={offer.itemoffer.img}
                className="card-img"
              />
              <Card.Body>
                <Card.Text>{offer.itemoffer.description}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          ) : (
            <div className="money">
              <h1 className="money-cash">${offer.moneyoffer.amount}</h1>
              <img className="money-img" src={money} />
            </div>
          )}
          <div className="exg">
            <img className="exg-img" src={exg_icon} />
            <div className="exg-buttons">
              {status === "incoming" ? (
                <>
                  <button
                    className="exg-button-aye exg-button"
                    onClick={() => {
                      this.setOffer(
                        user.email,
                        offer.moneyoffer.payerEmail,
                        offer.offerId,
                        "accepted"
                      );
                    }}
                  >
                    AYE
                  </button>
                  <button
                    className="exg-button-nay exg-button"
                    onClick={() => {
                      this.setOffer(
                        user.email,
                        offer.moneyoffer.payerEmail,
                        offer.offerId,
                        "terminated"
                      );
                    }}
                  >
                    NAY
                  </button>
                </>
              ) : (
                <button
                  className="exg-button-nay exg-button"
                  onClick={() => {
                    this.setOffer(
                      offer.targetItem.owneremail,
                      user.email,
                      offer.offerId,
                      "terminated"
                    );
                  }}
                >
                  Never Mind
                </button>
              )}
            </div>
          </div>

          <Card style={{ width: "30rem" }}>
            <Card.Title className="card-title">
              {offer.targetItem.pname}
            </Card.Title>
            <Card.Img
              variant="top"
              src={offer.targetItem.img}
              className="card-img"
            />
            <Card.Body>
              <Card.Text>{offer.targetItem.description}</Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </SectionWrapper>
        <MessageWrapper>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Leave an message</Form.Label>
            <Form.Control
              as="textarea"
              ref={msg => (this.msg = msg)}
              rows="3"
              placeholder="type here..."
            />
            {status === "incoming" ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.msgHandler(
                      user.email,
                      offer.moneyoffer.payerEmail,
                      offer.offerId,
                      user.name
                    );
                  }}
                >
                  Post
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.msgHandler(
                      offer.targetItem.owneremail,
                      user.email,
                      offer.offerId,
                      user.name
                    );
                  }}
                >
                  Post
                </Button>
              </>
            )}
          </Form.Group>
          {// say {e.message}
          this.state.conversation.map((e, index) => (
            <>
              <div className="messages">
                <div>
                  <div className="avatar">
                    {e.from === user.name ? <GiBatMask /> : <GiNinjaHead />}
                  </div>
                  <span className="name" key={index}>
                    {e.from === user.name ? "Me" : e.from}
                  </span>
                </div>
                <div>
                  <div className="date">{this.convertDate(e.date)}</div>
                  <div className="message-content">{e.message}</div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </MessageWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  conv: state.auth.conv
});

export default connect(
  mapStateToProps,
  { setOffer, addConv, getConv }
)(OfferDetails);

const SectionWrapper = styled.section`
  display: flex;
  padding: 5rem 10rem 0rem 10rem;
  justify-content: space-between;

  .exg {
    align-self: center;
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .exg-img {
    width: 10rem;
    height: 10rem;
  }
  .exg-buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 3rem;
  }
  .exg-button {
    width: 7rem;
    background-color: var(--mainDark);
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 50%;
  }
  .money {
    align-self: center;
    position: relative;
  }
  .money-img {
    width: 20rem;
    height: 20rem;
  }
  .money-cash {
    position: absolute;
    right: 0;
    top: 3rem;
  }
  .card-img {
    width: 200px;
    height: auto;
    margin-left: 7rem;
  }
  .card-title {
    margin-bottom: 0;
    text-align: center;
    font-size: 2rem;
    font-family: var(--fontCinzel);
    background-color: grey;
  }
`;
const MessageWrapper = styled.section`
  padding: 5rem 10rem 0rem 10rem;
  .avatar {
    width: 5rem;
    height: 5rem;
    background-color: white;
    border-radius: 50%;
    font-size: 3rem;
    padding: 0rem 1rem 1rem 1rem;
  }
  .name {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .messages {
    display: flex;
    font-size: 1rem;
  }
  .message-content {
    align-self: center;
    margin-left: 3rem;
    margin-top: 1rem;
  }
  .date {
    margin-left: 1rem;
  }
`;
