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
  if (status === "incoming")
    return (
      <DivWrapper>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Initiator</th>
              <th>Money Offer</th>
              <th>Item Offer</th>
              <th>My Item</th>
              <th>Date</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {offer.map((e, index) => (
              <>
                <tr key={index}>
                  <td>{index}</td>
                  <td>{e.initiator}</td>
                  <td>{e.moneyoffer.amount}</td>
                  <td>{e.itemoffer ? e.itemoffer.pname : "none"}</td>
                  <td>{e.targetItem.pname}</td>
                  <td>{convertDate(e.date)}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/users/mystuff/offer/details",
                        state: {
                          user,
                          offer: e
                        }
                      }}
                    >
                      <ButtonWrapper>
                        <GiTiedScroll />
                      </ButtonWrapper>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </DivWrapper>
    );
  else if (status === "outgoing")
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Owner</th>
            <th>My Money Offer</th>
            <th>My Item Offer</th>
            <th>Item</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {offer.map((e, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{e.receiver}</td>
              <td>{e.moneyoffer.amount}</td>
              <td>{e.itemoffer ? e.itemoffer.pname : "none"}</td>
              <td>{e.targetItem.pname}</td>
              <td>{convertDate(e.date)}</td>
              <td>
                <Link
                  to={{
                    pathname: "/users/mystuff/offer/details",
                    state: {
                      user,
                      offer: e
                    }
                  }}
                >
                  <ButtonWrapper>
                    <GiTiedScroll />
                  </ButtonWrapper>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  else
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer Initiator</th>
            <th>Offer Receiver</th>
            <th>Money Offer</th>
            <th>Item Offer</th>
            <th>Target Item</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {offer.map((e, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{e.initiator}</td>
              <td>{e.receiver}</td>
              <td>{e.moneyoffer.amount}</td>
              <td>{e.itemoffer ? e.itemoffer.pname : "none"}</td>
              <td>{e.targetItem.pname}</td>
              <td>{convertDate(e.date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
}

const ButtonWrapper = styled.span`
  text-align: center;
  font-size: 1.2rem;
`;
const DivWrapper = styled.div`
  width: 100vw;
`;
