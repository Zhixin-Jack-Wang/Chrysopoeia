import {
  USER_LOGIN,
  LOGIN_FAILED,
  ADD_ITEM,
  LOG_OUT,
  DEL_ITEM,
  EDT_ITEM
} from "../actions/types";
import React from "react";

const initialState = { isLogin: false, user: {}, errors: "", catalogue: [] };

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
        catalogue: action.payload.catalogue
      };
    case LOGIN_FAILED:
      return { ...state, isLogin: false, errors: action.payload.errors };
    case LOG_OUT:
      return { ...state, isLogin: false };
    case ADD_ITEM:
      return {
        ...state,
        user: action.payload.user,
        catalogue: action.payload.catalogue
      };
    case DEL_ITEM:
      return {
        ...state,
        user: action.payload.user,
        catalogue: action.payload.catalogue
      };
    case EDT_ITEM:
      return {
        ...state,
        user: action.payload.user,
        catalogue: action.payload.catalogue
      };
    default:
      return state;
  }
};
