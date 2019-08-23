import styled from "styled-components";
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
    .chat-msg {
      height: 50vh;
      padding: 0.5rem;
      border: 2px solid #e5e5e5;
      border-radius: 10px;
      overflow: scroll;
      overflow-x: hidden;
    }
    .chat-input {
      position: relative;
      margin-top: 1rem;
      width: 100%;
      border: 2px solid #e5e5e5;
      padding-right: 1.5rem;
      .chat-type {
        resize: none;
        border: none;
        outline: none;
        width: 100%;
        &::-webkit-scrollbar {
          width: 0px;
          background: transparent; /* Chrome/Safari/Webkit */
        }

        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      .chat-send {
        font-size: 1.2rem;
        position: absolute;
        right: 0.5rem;
        bottom: 0.2rem;
      }
    }
    margin: 1rem;
    /* border: 2px solid #e5e5e5;
    height: 50vh;
    border-radius: 10px; */
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

export default Wrapper;
