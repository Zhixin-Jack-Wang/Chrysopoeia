import React, { Component } from "react";
import Axios from 'axios';
import { Link, Route, Redirect } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootswatch/dist/journal/bootstrap.min.css";
import styled from 'styled-components';
import logo from '../../assets/Icon.png';
class Login extends Component {
    state={
        isLogin:false,
        email:''
    }

  componentDidMount(){
  }

  // Submit Handler
  formSubmit = (e) => {
    e.preventDefault();
    console.log(this.form.email.value);
    console.log(this.form.password.value);
    const body = {
        email:this.form.email.value,
        password:this.form.password.value,
    }
    Axios.post('/users/login',body)
      .then(response=>{
        this.setState({isLogin:true, email:response.data.email});
        console.log({email:response});
      }
    )
      .catch(err=>{
        this.setState({isLogin:false});
        console.log(err);
      }
    )
  }

  // Redirect
  renderRedirect = () => {
      if(this.state.isLogin)
        return (<Redirect to={{
            pathname: '/users/dashboard',
            state: {
                email:this.state.email
        }}
        }/>)
  }

  render() {
    return (
      <SectionWrapper>
        {this.renderRedirect()}
        <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
          <DivWrapper>
            <img src={logo} className="logo"/> 
              <h1 className="text-center mb-3 title">
                  Login
              </h1>
          </DivWrapper>
            <form ref={form=>this.form=form} onSubmit={this.formSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="btn btn-secondary btn-block buttons">Login</button>
            </form>
            <p className="lead mt-4">
              No Account? <a href="/users/register">Register</a>
            </p>
          </div>
        </div>
      </div>
      </SectionWrapper>
    );
  }
}
export default Login;
const DivWrapper = styled.div
`
display:flex;
justify-content:center;
.logo{
    width:4rem;
}
.title{
  align-self:center;
}

`

const SectionWrapper = styled.section`
.buttons{
  background-color:var(--lightBlue);
  border:none;
}
`