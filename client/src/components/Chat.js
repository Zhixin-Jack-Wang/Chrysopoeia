import { Modal, Button } from "react-bootstrap";
import React from "react";
import styled from "styled-components";
const Chat = props => {
  return (
    <Wrapper>
      <div
        className="backdrop"
        onClick={e => {
          console.log(e.currentTarget);
        }}
      >
        <div
          className="chat-modal"
          onClick={e => {
            e.stopPropagation();
            console.log(e.currentTarget);
          }}
        >
          <div className="chat-header">
            <div className="chat-title">
              <i className="far fa-comment-dots" />{" "}
              <span className="chat-title-text">Chat</span>
            </div>
          </div>
          <div className="chat-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            dolore?
          </div>
          <div className="chat-footer">
            <button className="close-btn">Close</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.section`
  .backdrop {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 1rem;
    justify-content: center;
  }
  .chat-modal {
    position: fixed;
    width: 90%;
    max-width: 36rem;
    align-self: center;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 103;
  }
  .chat-header {
    padding: 0.3rem 1rem;
    background-color: var(--mainYellow);
    .chat-title {
      margin-bottom: 0;
      font-size: 2rem;
      &-text {
        font-size: 1.5rem;
      }
    }
  }
  .chat-body {
    margin: 1rem;
    border: 2px solid #e5e5e5;
    height: 50vh;
    border-radius: 10px;
    padding: 0.5rem;
  }
  .chat-footer {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 1rem 1rem 0;
    .close-btn {
      border-radius: 3px;
      border: none;
      color: white;
      background-color: var(--mainGrey);
      &:active {
        position: relative;
        top: 1px;
      }
    }
  }
`;
