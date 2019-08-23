import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./styled/Wrapper";
const Chat = props => {
  console.log("opened");
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current.scrollHeight);
    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };
  const submitHandler = e => {
    e.preventDefault();
    console.log(input);
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reprehenderit minus laborum ullam, a quasi impedit tenetur ipsum
              aperiam adipisci rem aliquam. Quae expedita distinctio, cumque aut
              necessitatibus, autem id delectus minus at quidem, sit doloremque?
              Sed dolorum laborum quos ipsum dolor dolore adipisci neque
              voluptas incidunt? Velit voluptas quidem voluptate? Molestiae at
              laudantium ipsam accusamus atque maiores quasi dolorum explicabo
              voluptates eum maxime enim doloribus commodi nihil, assumenda
              distinctio inventore harum nemo mollitia vero consequuntur. Nemo
              fuga ratione, iste autem, ut fugit quam, cupiditate optio
              explicabo pariatur dolor dolorum reiciendis ad cum mollitia
              veritatis repellat quibusdam velit expedita molestiae officiis!
            </div>

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

export default Chat;
