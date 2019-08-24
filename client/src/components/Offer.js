import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setOffer, addConv, getConv } from "../store/actions/authActions.js";
import { GiCoins } from "react-icons/gi";
import Chat from "./Chat";
import { DivWrapper } from "./styled/OfferWrapper.js";

const Offer = props => {
  const { user, other, convertDate, offer, status } = props;
  const [open, setOpen] = useState(false);
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
      {open && (
        <Chat openChat={openChat} conv={offer.conversation} {...props} />
      )}
      <DivWrapper>
        <div className="date">
          <strong>Date:</strong> {convertDate(offer.date)}
        </div>
        <div className="items">
          <div className="item">
            <div className="item-img">
              <Link
                to={{
                  pathname: "/details",
                  state: { ...user.item, offer: true, status: status }
                }}
              >
                <img src={user.item.img} />
              </Link>
            </div>
            <p className="item-name">
              <strong>Your Item:</strong> <br />
              {user.item.pname}
            </p>
            {user.moneyoffer > 0 && (
              <div className="cash">
                <p>
                  <strong>+</strong> <GiCoins className="cash-icon" />{" "}
                  {user.moneyoffer}
                </p>
              </div>
            )}
          </div>
          <div className="item">
            <div className="item-img">
              <Link
                to={{
                  pathname: "/details",
                  state: { ...other.item, offer: true, status: status }
                }}
              >
                <img src={other.item.img} />
              </Link>
            </div>
            <p className="item-name">
              <strong>Their Item:</strong> <br />
              {other.item.pname}
            </p>
            {other.moneyoffer > 0 && (
              <div className="cash">
                <p>
                  <strong>+</strong> <GiCoins className="cash-icon" />{" "}
                  {other.moneyoffer}
                </p>
              </div>
            )}
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
  userInfo: state.auth.user
});

export default connect(
  mapStateToProps,
  { setOffer, addConv, getConv }
)(Offer);
