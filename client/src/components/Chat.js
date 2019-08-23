import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./styled/Wrapper";
import Msg from "./Msg.js";
import { connect } from "react-redux";
import { addConv, getConv } from "../store/actions/authActions.js";

const Chat = props => {
  const ref = useRef(null);
  // console.log(props.user);
  // console.log(props.other);
  // console.log(props.offer);
  // console.log(props.status);
  const [input, setInput] = useState("");
  // const [conv, setConv] = useState([]);
  useEffect(() => {
    console.log("mount");
    props.getConv(props.conv);
    console.log(ref.current.scrollHeight);
    setTimeout(() => (ref.current.scrollTop = ref.current.scrollHeight), 100);
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    const { offerId, targetItem, itemoffer } = props.offer;
    const message = input;
    const from = props.user.name;
    const emailPost = props.userInfo.email;
    const emailReceive =
      targetItem.owneremail === emailPost
        ? itemoffer.owneremail
        : targetItem.owneremail;
    const body = {
      offerId,
      emailPost,
      emailReceive,
      from,
      message
    };
    props.addConv(body);
    setTimeout(() => {
      setInput("");
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, 1000);
  };

  return (
    <Wrapper>
      <div
        className="backdrop"
        onClick={e => {
          props.openChat(false);
        }}
      >
        <div
          className="chat-modal"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="chat-header">
            <div className="chat-title">
              <i className="far fa-comment-dots" />{" "}
              <span className="chat-title-text">Chat</span>
            </div>
          </div>
          <div />
          <div className="chat-body">
            <div className="chat-msg" ref={ref}>
              {props.newConv.map((e, index) => (
                <Msg key={index} e={e} />
              ))}
            </div>
            {props.status === "terminated" || props.status === "accepted" || (
              <form className="chat-input" onSubmit={submitHandler}>
                <textarea
                  className="chat-type"
                  type="text"
                  value={input}
                  onChange={handleChange}
                />

                <i
                  className="far fa-paper-plane chat-send"
                  onClick={submitHandler}
                />
              </form>
            )}
          </div>
          <div className="chat-footer">
            <button
              className="close-btn"
              onClick={() => {
                props.openChat(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  newConv: state.auth.conv,
  userInfo: state.auth.user
});

export default connect(
  mapStateToProps,
  { addConv, getConv }
)(Chat);
