import React from "react";
import { MessageWrapper } from "./styled/Wrapper";
const Msg = () => {
  return (
    <MessageWrapper>
      <div className="messages">
        <div>
          <div className="avatar">
            {e.from === user.name ? <GiBatMask /> : <GiNinjaHead />}
          </div>
          <span className="name" key={index}>
            {e.from === user.name ? "Me" : e.from}
          </span>
        </div>
        <div>
          <div className="date">{this.convertDate(e.date)}</div>
          <div className="message-content">{e.message}</div>
        </div>
      </div>
      <hr />
    </MessageWrapper>
  );
};

export default Msg;
