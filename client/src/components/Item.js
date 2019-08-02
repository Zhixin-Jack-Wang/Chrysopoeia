import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { FaGem } from 'react-icons/fa';
export default class Item extends Component {
  render() {
    const {img,pname,expect} = this.props;
    return (
      <ItemWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div className="titleWrapper">
            <h5 className="title">{pname}</h5>          
            </div>
                <div className="img-container p-5">
                  <Link to={{
                    pathname:"/details",
                    state:{
                       ...this.props
                    }}}>
                    <img src={img} alt="" className="card-img-top" />
                  </Link>
                  <button className="cart-btn">
                    <FaGem/> 
                  </button>
                  <button className="cart-btn">
                    <FaGem/>
                  </button>
                </div>
       
          <div className="card-footer d-flex justify-content-between">
              <span className="exchangefor">Exchange for:</span>
            <h5 className="text-blue font-italic mb-0">
              {expect}
            </h5>
          </div>
        </div>
      </ItemWrapper>
    );
  }
}

const ItemWrapper = styled.div`
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
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn{
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;  
  }
  .titleWrapper{
    width:100%;
    display:flex;
    justify-content:center;
    padding:0rem 1rem;
  }
  .title{
    padding-top:0.5rem;
    font-family:var(--fontCinzel);
    text-align:center;
  }
  .exchangefor{
    font-weight:bold;
    color:var(--mainBlue);
  }
`;
