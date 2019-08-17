import {
  USER_LOGIN,
  LOGIN_FAILED,
  ADD_ITEM,
  LOG_OUT,
  DEL_ITEM,
  EDT_ITEM,
  SET_OFFER,
  MAKE_OFFER,
  ADD_CONV,
  GET_CONV,
  CLR_ERR
} from "../actions/types";
import React from "react";

const initialState = {
  isLogin: false,
  user: {},
  errors: "",
  catalogue: [],
  conv: []
};

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
    case MAKE_OFFER:
      return {
        ...state,
        user: action.payload.user
      };
    case ADD_CONV:
      return { ...state, user: action.payload.user, conv: action.payload.conv };

    case SET_OFFER:
      return {
        ...state,
        user: action.payload.user
      };

    case CLR_ERR:
      return {
        ...state,
        errors: ""
      };
    default:
      return state;
  }
};
