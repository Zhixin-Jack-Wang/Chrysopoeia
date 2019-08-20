import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { GiTiedScroll } from "react-icons/gi";
import styled from "styled-components";

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

export default function Offer({ offer, status, user }) {
  return (
    <DivWrapper>
      <div className="date" />
      <div className="items">
        <div className="user-item">
          <img
            src="https://source.unsplash.com/random"
            className="user-item-img"
          />
          <div className="user-item-name" />
        </div>
        <div className="exchange-icon" />
        <div className="other-item">
          <img
            className="other-item-img"
            src="https://source.unsplash.com/random"
          />
          <div className="other-item-name" />
        </div>
      </div>
      <div className="actions">
        <button className="action-chat" />
        <div className="action-decision">
          <button className="action-chat" />
          <button className="action-chat" />
        </div>
      </div>
      <hr />
    </DivWrapper>
  );
}

const ButtonWrapper = styled.span`
  text-align: center;
  font-size: 1.2rem;
`;
const DivWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .items {
    display: flex;
    justify-content: space-between;
    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }
  .actions {
    display: flex;
  }
`;
