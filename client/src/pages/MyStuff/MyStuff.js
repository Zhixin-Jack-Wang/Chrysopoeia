import React, { Component } from "react";
import Axios from "axios";
import { Link, Route, Redirect } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootswatch/dist/journal/bootstrap.min.css";
import Nav from "../../components/Navbar";
import Title from "../../components/Title";
import MyItem from "../../components/MyItem";
import Offer from "../../components/Offer";
import {
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
  Modal,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import styled from "styled-components";
import { GiBlacksmith } from "react-icons/gi";
import { ButtonContainer } from "../../components/Button";
class Mystuff extends Component {
  state = {
    user: {
      name: "",
      email: "",
      inventory: [],
      offer:[]
    },
    show: false,
    fieldArr: ["Item Name", "expect", "mode"],
    offer: ["Incoming", "Outgoing", "Terminated", "Accepted"],
    rendering: "inventory",
    offerType:"incoming"
  };

  componentDidMount() {
    // this.setState({ user: { ...this.props.location.state } });
    Axios.post('/users/name',{email:this.props.location.state.email})
    .then(response =>{
        // console.log(response);
        this.setState({
            user:response.data
        });
    })
  }

  updateInventory = () => {
    Axios.post("/users/name", {
      email: this.state.user.email
    }).then(response => {
      // console.log(response);
      this.setState({
        user: response.data
      });
    });
  };

  selectHandler = e => {
    // this.setState({modalOpen:this.state.modalOpen});
    const target = e.target.innerHTML;
    this.drop.title = target;
    this.drop.firstChild.innerHTML = target;
    const oft = target[0].toLowerCase() + target.slice(1);
    // console.log(oft);
    this.setState({rendering:"offers",offerType:oft})
  };

  invButtonClick = () => {
      this.setState({rendering:"inventory"});
  }

  submitHandler = e => {
    e.preventDefault();
    const pname = this.input0.value;
    const expect = this.input1.value;
    const mode = this.input2.value;
    const description = this.input3.value;
    const img = this.state.imageUrl;
    const body = {
      email: this.state.user.email,
      pname,
      expect,
      img,
      mode,
      description,
      ownername: this.state.user.name,
      owneremail: this.state.user.email
    };
    // console.log(body);
    Axios.put("/users/item", body).then(response => {
      // console.log(response);
      this.updateInventory();
      this.handleClose();
    });
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
    Axios.post("/upload", formData, config).then(
      response => {
        // console.log(response);
        this.setState({ imageUrl: response.data.file });
      }
    );
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    // console.log(this.state.user);
    if(this.state.rendering==="inventory"){
    return (
      <>
        <Nav {...this.state.user} />
        <ItemWrapper className="py-5">
          <div className="container">
            <div className="d-flex flex-column">
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="btn-me" onClick={this.invButtonClick}>
                  Inventory
                </Button>
                <DropdownButton
                  ref={drop => {
                    this.drop = drop;
                  }}
                  id="dropdown-basic-button"
                  title="Offers"
                >
                  {this.state.offer.map((e, index) => (
                    <Dropdown.Item key={index} onClick={this.selectHandler}>
                      {e}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </ButtonGroup>
            </div>

            {/* My Inventory */}
            <Title name="My" title="Inventory" />
            <div className="row">
              {this.state.user.inventory.map(e => {
                return (
                  <MyItem
                    key={e._id}
                    {...e}
                    user={this.state.user}
                    updateInventory={this.updateInventory}
                  />
                );
              })}
            </div>
          </div>
        </ItemWrapper>
        <ButtonWrapper>
          <OverlayTrigger overlay={<Tooltip id="tooltip">Add New</Tooltip>}>
            <span className="d-inline-block createNew">
              <button className="createNew" onClick={this.handleShow}>
                <GiBlacksmith />
              </button>
            </span>
          </OverlayTrigger>
        </ButtonWrapper>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <ModalWrapper>
            <Modal.Header className="modal-header" closeButton>
              <GiBlacksmith className="modal-icon" />
              <Modal.Title className="modal-title">Add New Item</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* <label htmlFor="basic-url">Information</label> */}
              {this.state.fieldArr.map((e, index) => {
                return (
                  <InputGroup key={index} className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">{e}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      ref={input => (this["input" + index] = input)}
                      id={`input${index}`}
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                );
              })}
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>description</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  ref={input => (this.input3 = input)}
                  as="textarea"
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
              <Button variant="primary" onClick={this.submitHandler}>
                Submit
              </Button>
            </Modal.Footer>
          </ModalWrapper>
        </Modal>
        )
      </>
    );}

    // Return offer
    else{
        return (
            <>
            <Nav {...this.state.user} />
            <ItemWrapper className="py-5">
              <div className="container">
                <div className="d-flex flex-column">
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" className="btn-me" onClick={this.invButtonClick}>
                      Inventory
                    </Button>
                    <DropdownButton
                      ref={drop => {
                        this.drop = drop;
                      }}
                      id="dropdown-basic-button"
                      title="Offers"
                    >
                      {this.state.offer.map((e, index) => (
                        <Dropdown.Item key={index} onClick={this.selectHandler}>
                          {e}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </ButtonGroup>
                </div>
    
                {/* My Offer */}
                <Title name={this.state.offerType} title="Offer" />
                <div className="row">
                        <Offer user={this.state.user} offer={this.state.user.offer.filter(e=>e.status===this.state.offerType)} status={this.state.offerType}/>
                </div>
              </div>
            </ItemWrapper>
        </>
        )
    }
  }
}
const ItemWrapper = styled.section`
#dropdown-basic-button{
  background-color:var(--lightBlue);
  border-color:grey;
}`;
const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  .createNew {
    position: fixed;
    top: 80%;
    right: 5rem;
    font-size: 3rem;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
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
export default Mystuff;
