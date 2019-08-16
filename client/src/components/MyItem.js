import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { GiSkullCrossedBones } from "react-icons/gi";
import { GiFairyWand } from "react-icons/gi";
import {
  OverlayTrigger,
  Tooltip,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { edtItem, delItem } from "../store/actions/authActions.js";

class myItem extends Component {
  state = {
    show: false,
    user: {},
    edit: true,
    fieldArr: ["Item Name", "expect", "mode"],
    imageUrl: ""
  };

  componentDidMount() {}

  handleClose = () => {
    this.setState({ show: false });
  };

  // deleteItem = (email, pname) => {
  //   this.setState({ show: false });

  //   Axios.put("/users/item/delete", { email: email, pname: pname }).then(
  //     response => {
  //       console.log("delete");
  //     }
  //   );
  // };

  uploadHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    var formData = new FormData();
    const file = this.myImage.files[0];
    formData.append("myImage", file);
    Axios.post("/upload", formData, config).then(response => {
      this.setState({ imageUrl: response.data.file });
    });
  };

  updateItem = id => {
    const pid = id;
    const pname = this.input0.value;
    const expect = this.input1.value;
    const mode = this.input2.value;
    const description = this.input3.value;
    console.log({ description: description });
    const img = this.state.imageUrl;
    const body = {
      pid,
      email: this.props.user.email,
      pname,
      expect,
      img,
      mode,
      description,
      ownername: this.props.user.name,
      owneremail: this.props.user.email
    };
    Axios.put("/users/item/update", body).then(response => {
      this.props.updateInventory();
      this.handleClose();
    });
  };
  handleShow = (mode, img) => {
    if (mode) {
      this.setState({ imageUrl: img });
    }
    this.setState({ show: true, edit: mode });
  };

  render() {
    const {
      user,
      img,
      pname,
      expect,
      mode,
      owneremail,
      _id,
      description
    } = this.props;
    return (
      <>
        <ItemWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
          <div className="card">
            <div className="titleWrapper">
              <h5 className="title">{pname}</h5>
            </div>
            <div className="img-container p-5">
              <Link
                to={{
                  pathname: "/users/mystuff/details",
                  state: {
                    user,
                    pname,
                    img,
                    expect,
                    mode,
                    description
                  }
                }}
              >
                <img src={img} alt="" className="card-img-top" />
              </Link>
              <div className="group-btn">
                <OverlayTrigger overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
                  <span className="d-inline-block">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        this.handleShow(true, img);
                      }}
                    >
                      <GiFairyWand />
                    </button>
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip">Delete</Tooltip>}
                >
                  <span className="d-inline-block">
                    <button
                      className="delete-btn"
                      onClick={() => {
                        this.handleShow(false, img);
                      }}
                    >
                      <GiSkullCrossedBones />
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-between">
              <span className="exchangefor">Exchange for:</span>
              <h5 className="text-blue font-italic mb-0">{expect}</h5>
            </div>
          </div>
        </ItemWrapper>
        {this.state.edit ? (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <ModalWrapper>
              <Modal.Header className="modal-header" closeButton>
                <GiFairyWand className="modal-icon" />
                <Modal.Title className="modal-title">Update Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <label htmlFor="basic-url">Information</label> */}
                {/* {this.state.fieldArr.map((e,index)=>{
                                return (
                                <InputGroup key={index} className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3" >
                                        {e}
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl ref={input=>this["input"+index]=input} id={`input${index}`} aria-describedby="basic-addon3" />
                                </InputGroup>
                            )})} */}

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                      Item Name
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={input => (this.input0 = input)}
                    defaultValue={pname}
                    aria-describedby="basic-addon3"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">Expect</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={input => (this.input1 = input)}
                    defaultValue={expect}
                    aria-describedby="basic-addon3"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">Mode</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={input => (this.input2 = input)}
                    defaultValue={mode}
                    aria-describedby="basic-addon3"
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={input => (this.input3 = input)}
                    id="input3"
                    as="textarea"
                    defaultValue={description}
                    aria-label="description"
                  />
                </InputGroup>
                <br />
                <label htmlFor="exampleFormControlFile1" className="select-btn">
                  Choose An Image
                </label>
                <input
                  type="file"
                  ref={myImage => (this.myImage = myImage)}
                  id="myImage"
                  name="myImage"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                />
                <Button
                  variant="primary"
                  className="upload-btn"
                  onClick={this.uploadHandler}
                >
                  Upload
                </Button>
                <br />
                <img src={this.state.imageUrl} className="img-preview" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.updateItem(_id);
                  }}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </ModalWrapper>
          </Modal>
        ) : (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <ModalWrapper>
              <Modal.Header className="modal-header" closeButton>
                <GiSkullCrossedBones className="modal-icon" />
                <Modal.Title className="modal-title">Warning!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure to delete this item form your inventory?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Nope
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.delItem(owneremail, pname);
                    this.handleClose();
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </ModalWrapper>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(
  mapStateToProps,
  { delItem, edtItem }
)(myItem);

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
`;

const ModalWrapper = styled.form`
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
          max-width:300px;
          max-height:300px;
      }
       
    `;
