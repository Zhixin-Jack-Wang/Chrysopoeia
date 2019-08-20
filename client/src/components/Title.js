import React from "react";
import styled from "styled-components";

export default function Title({ name, title }) {
  return (
    <DivWrapper>
      <div className="row">
        <div className="col-10 mx-auto my-2 text-center text-title">
          <h1 className="title text-capitalize font-weight-bold">
            {name} <strong className="text-blue">{title}</strong>
          </h1>
        </div>
      </div>
    </DivWrapper>
  );
}

const DivWrapper = styled.div`
  .title {
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;
