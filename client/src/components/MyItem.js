import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
import {
  ItemWrapper,
  ModalWrapper
} from "../components/styled/MyItemWrapper.js";
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
    this.props.edtItem(body);
    this.handleClose();
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
          <div className="item-btns">
            <button
              onClick={() => {
                this.handleShow(true, img);
              }}
            >
              <GiFairyWand className="btn-icon" />
              Edit
            </button>
            <button
              onClick={() => {
                this.handleShow(false, img);
              }}
            >
              <GiSkullCrossedBones className="btn-icon" />
              Delete
            </button>
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
          <Modal show={this.state.show} onHide={this.handleClose} centered>
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
