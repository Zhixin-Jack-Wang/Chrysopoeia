import {
  USER_LOGIN,
  LOGIN_FAILED,
  LOG_OUT,
  ADD_ITEM,
  DEL_ITEM,
  EDT_ITEM
} from "./types";
import axios from "axios";

//LOGIN
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

//ADD ITEM
export const addItem = body => dispatch => {
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
    .catch(e => console.log(e.response));
};

//DELETE ITEM
export const delItem = (email, pname) => dispatch => {
  axios
    .put("/users/item/delete", { email: email, pname: pname })
    .then(response => {
      console.log(response);
      dispatch({
        type: DEL_ITEM,
        payload: {
          user: response.data.user,
          catalogue: response.data.catalogue
        }
      });
    })
    .catch(e => console.log(e.response));
};

//EDIT ITEM
export const edtItem = body => dispatch => {
  axios
    .put("/users/item/update", body)
    .then(response => {
      console.log(response);
      dispatch({
        type: EDT_ITEM,
        payload: {
          user: response.data.user,
          catalogue: response.data.catalogue
        }
      });
    })
    .catch(e => console.log(e.response));
};
