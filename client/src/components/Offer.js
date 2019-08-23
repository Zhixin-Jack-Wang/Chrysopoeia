import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setOffer, addConv, getConv } from "../store/actions/authActions.js";
import Chat from "./Chat";

const Offer = props => {
  const { user, other, convertDate, offer, status } = props;
  const [open, setOpen] = useState(true);

  const changeOffer = (userEmail, otherEmail, offerId, status) => {
    const body = {
      userEmail,
      otherEmail,
      offerId,
      status
    };
    props.setOffer(body);
  };

  const openChat = value => {
    setOpen(value);
  };
  return (
    <>
      {open && <Chat openChat={openChat} />}
      <DivWrapper>
        <div className="date">
          <strong>Date:</strong> {convertDate(offer.date)}
        </div>
        <div className="items">
          <div className="item">
            <Link to={{ pathname: "/details", state: { ...user.item } }}>
              <img src={user.item.img} className="item-img" />
            </Link>
            <p className="item-name">
              <strong>Your Item:</strong> <br />
              {user.item.pname}
            </p>
          </div>
          <div className="item">
            <Link to={{ pathname: "/details", state: { ...other.item } }}>
              <img className="item-img" src={other.item.img} />
            </Link>
            <p className="item-name">
              <strong>Their Item:</strong> <br />
              {other.item.pname}
            </p>
          </div>
        </div>
        <div className="actions">
          <button
            className="action-chat"
            onClick={() => {
              openChat(true);
            }}
          >
            Chat Log
          </button>
          <div className="action-decision">
            {status === "incoming" && (
              <>
                <button
                  className="action-accept"
                  onClick={() => {
                    changeOffer(
                      other.item.owneremail,
                      user.item.owneremail,
                      offer.offerId,
                      "accepted"
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  className="action-decline"
                  onClick={() => {
                    changeOffer(
                      other.item.owneremail,
                      user.item.owneremail,
                      offer.offerId,
                      "terminated"
                    );
                  }}
                >
                  Decline
                </button>
              </>
            )}
            {status === "outgoing" && (
              <button
                className="action-decline"
                onClick={() => {
                  changeOffer(
                    other.item.owneremail,
                    user.item.owneremail,
                    offer.offerId,
                    "terminated"
                  );
                }}
              >
                Recall
              </button>
            )}
          </div>
        </div>
        <div className="divider" />
      </DivWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  userInfo: state.auth.user,
  conv: state.auth.conv
});

export default connect(
  mapStateToProps,
  { setOffer, addConv, getConv }
)(Offer);

const ButtonWrapper = styled.span`
  text-align: center;
  font-size: 1.2rem;
`;
const DivWrapper = styled.div`
  display: flex;
  max-width: 100vh;
  flex-direction: column;
  .date {
  }
  .items {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .item {
      max-width: 8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-name {
        width: 100%;
        font-size: 0.8rem;
        overflow-wrap: break-word;
      }
    }
    img {
      width: 100%;
      height: 8rem;
      object-fit: contain;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    .action-chat {
      font-size: 0.8rem;
      padding: 0.2rem;
      border-radius: 20px;
    }
    .action-decision {
      button {
        border-radius: 3px;
        border: none;
        color: white;
      }
      .action-accept {
        background-color: var(--lightBlue);
        margin-right: 0.5rem;
      }
      .action-decline {
        background-color: var(--mainGrey);
      }
    }
  }
  .divider {
    margin: 1rem 0;
    width: 100%;
    border: 0.5px solid black;
  }
`;
