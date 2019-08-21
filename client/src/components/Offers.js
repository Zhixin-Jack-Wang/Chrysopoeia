import React from "react";
import styled from "styled-components";
import Offer from "./Offer";
import { FaBreadSlice } from "react-icons/fa";
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

//"Incoming", "Outgoing", "Terminated", "Accepted"],
const mapUser = (offer, status) => {
  let offerInfo, user, other;
  switch (status) {
    case "incoming":
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
    case "outgoing":
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
    default:
      break;
  }
};

export default function Offers({ offer, status, user }) {
  return (
    <DivWrapper>
      {offer.map(e => {
        console.log(status);
        let offerInfo = mapUser(e, status);
        console.log({ offerInfo: offerInfo });
        return (
          <Offer
            key={e._id}
            {...offerInfo}
            convertDate={convertDate}
            offer={e}
          />
        );
      })}
    </DivWrapper>
  );
}

const DivWrapper = styled.div`
  margin-top: 2rem;
`;
