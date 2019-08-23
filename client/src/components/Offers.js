import React from "react";
import styled from "styled-components";
import Offer from "./Offer";
import { FaBreadSlice } from "react-icons/fa";
import { connect } from "react-redux";
import Chat from "./Chat";

function convertDate(iso) {
  const date = new Date(iso);
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let hr = date.getHours();
  let ampm = hr > 12 ? "PM" : "AM";
  let min = date.getMinutes();
  min = min < 10 ? "0" + min : min;
  const newDate =
    date.getFullYear() +
    "-" +
    month +
    "-" +
    date.getDate() +
    " " +
    hr +
    ":" +
    min +
    ":" +
    date.getSeconds() +
    " " +
    ampm;
  return newDate;
}

const mapUser = (offer, status, userInfo) => {
  let offerInfo, user, other;
  const userEmail = userInfo.email;
  if (userEmail !== offer.itemoffer.owneremail) {
    user = {
      name: offer.receiver,
      item: offer.targetItem,
      moneyoffer: 0
    };
    other = {
      name: offer.initiator,
      item: offer.itemoffer,
      moneyoffer: offer.moneyoffer
    };
    return (offerInfo = { user, other });
  } else {
    user = {
      name: offer.initiator,
      item: offer.itemoffer,
      moneyoffer: offer.moneyoffer
    };
    other = {
      name: offer.receiver,
      item: offer.targetItem,
      moneyoffer: 0
    };
    return (offerInfo = { user, other });
  }
};
const Offers = ({ offer, status, user }) => {
  return (
    <DivWrapper>
      {offer.map(e => {
        let offerInfo = mapUser(e, status, user);
        return (
          <Offer
            key={e._id}
            {...offerInfo}
            convertDate={convertDate}
            offer={e}
            status={status}
          />
        );
      })}
    </DivWrapper>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Offers);

const DivWrapper = styled.div`
  margin-top: 2rem;
`;
