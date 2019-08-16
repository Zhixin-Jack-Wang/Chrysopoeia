import { USER_LOGIN, LOGIN_FAILED, LOG_OUT, ADD_ITEM } from "./types";
import axios from "axios";

//Login
export const userLogin = body => dispatch => {
  axios
    .post("/users/login", body)
    .then(response => {
      console.log({ action: "log in success" });
      console.log(response);
      dispatch({
        type: USER_LOGIN,
        payload: {
          user: response.data.user,
          catalogue: response.data.catalogue
        }
      });
    })
    .catch(err => {
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
      dispatch({
        type: ADD_ITEM,
        payload: {
          user: response.data.user,
          catalogue: response.data.catalogue
        }
      });
    })
    .catch();
};
