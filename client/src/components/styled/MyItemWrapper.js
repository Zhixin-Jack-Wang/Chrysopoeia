import styled from "styled-components";
export const ItemWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .group-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--mainYellow);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .edit-btn {
    background: var(--mainYellow);
    border: none;
    color: var(--mainWhite);
  }
  .delete-btn {
    background: var(--mainYellow);
    border: none;
    color: var(--mainWhite);
  }
  .img-container:hover .group-btn {
    transform: translate(0, 0);
  }

  .edit-btn:hover {
    color: var(--mainDark);
    cursor: pointer;
  }
  .delete-btn:hover {
    color: var(--mainRed);
    cursor: pointer;
  }
  .titleWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0rem 1rem;
  }
  .title {
    padding-top: 0.5rem;
    font-family: var(--fontCinzel);
    text-align: center;
  }
  .exchangefor {
    font-weight: bold;
    color: var(--mainBlue);
  }
  .item-btns {
    display: flex;
    justify-content: space-between;
    button {
      color: white;
      background-color: var(--lightBlue);
      border: none;
      border-radius: 2px;
      font-size: 1rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      &:hover {
        color: red;
      }
    }
    .btn-icon {
      margin-bottom: 0.3rem;
      margin-right: 0.1rem;
    }
  }
`;

export const ModalWrapper = styled.form`
        .modal-header{
            background-color:var(--mainYellow);
        }
        .modal-icon{
            font-size:2rem
            margin-right:1rem;
        }
        .modal-title{
            color:var(--mainDark);
        }
        .select-btn{
          border: 1px solid #ccc;
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
          background-color:#e9ecef;
          color:#495057;
          border-radius:.25rem;
      }
      .upload-btn{
          background-color:var(--lightBlue);
          border:none;
      }
      input[type="file"] {
          display: none;
      }
      .img-preview{
          width:80vw;
          max-width:300px;
          max-height:300px;
      }
       
    `;
