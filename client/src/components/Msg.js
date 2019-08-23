import React from "react";
import { MessageWrapper } from "./styled/Wrapper";
import { GiNinjaHead, GiBatMask } from "react-icons/gi";
import { connect } from "react-redux";
const Msg = ({ user, e }) => {
  console.log("rendered");
  return (
    <MessageWrapper>
      <div className="messages">
        <div>
          <div className="avatar">
            {e.from === user.name ? <GiBatMask /> : <GiNinjaHead />}
          </div>
          <span className="name">{e.from === user.name ? "Me" : e.from}</span>
        </div>
        <div>
          <div className="date">{convertDate(e.date)}</div>
          <div className="message-content">{e.message}</div>
        </div>
      </div>
      <hr />
    </MessageWrapper>
  );
};

var convertDate = iso => {
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

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(
  mapStateToProps,
  {}
)(Msg);
