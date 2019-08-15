import { USER_LOGIN, LOGIN_FAILED, LOG_OUT } from "./types";
import axios from "axios";

export const userLogin = body => dispatch => {
  axios
    .post("/users/login", body)
    .then(response => {
      console.log({ action: "log in success" });
      //retrieve user
      axios.post("/users/name", { email: body.email }).then(response => {
        console.log(response);
        const user = response.data;
        axios
          .get("/users/inv")
          .then(({ data }) => {
            const catalogue = [];
            data.forEach(({ inventory }) => {
              inventory.forEach(i => catalogue.push(i));
            });
            dispatch({
              type: USER_LOGIN,
              payload: { user: response.data, catalogue: catalogue }
            });
          })
          .catch(err => console.log(err.response));
      });
    })
    .catch(err => {
      //   this.setState({ isLogin: false, errors: err.response.data });

      console.log(err.response);
      dispatch({
        type: LOGIN_FAILED,
        payload: { errors: err.response.data }
      });
    });
};

//LOGOUT
export const logOut = () => dispatch => {
  dispatch({
    type: LOG_OUT
  });
};

export const addItem = body => dispatch => {
  console.log("action : addItem");
  axios
    .put("/users/item", body)
    .then(response => {
      console.log(response);
      axios
        .post("/users/name", {
          email: body.email
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error.response));
    })
    .catch(error => console.log(error.response));
};
