import styled from "styled-components";
export const DivWrapper = styled.div`
  display: flex;
  max-width: 100vh;
  width: 100%;
  flex-direction: column;

  .date {
  }
  .items {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .item {
      max-width: 50vw;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &-name {
        width: 100%;
        font-size: 0.8rem;
        overflow-wrap: break-word;
      }
      &-img {
        display: flex;
        img {
          max-width: 600px;
          height: 8rem;
          object-fit: fill;
        }
      }
      .cash {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        .cash-icon {
          color: #ffd700;
          font-size: 2rem;
        }
      }
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    .action-chat {
      font-size: 0.8rem;
      padding: 0.2rem;
      border-radius: 20px;
    }
    .action-decision {
      button {
        border-radius: 3px;
        border: none;
        color: white;
      }
      .action-accept {
        background-color: var(--lightBlue);
        margin-right: 0.5rem;
      }
      .action-decline {
        background-color: var(--mainGrey);
      }
    }
  }
  .divider {
    margin: 1rem 0;
    width: 100%;
    border: 0.5px solid black;
  }
`;
