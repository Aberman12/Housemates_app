import {
    NEW_GROUP_CREATED,
    LOADING,
    GROUP_ZIP_CHANGED,
    GROUP_NAME_CHANGED
  } from "../actions/types";
  
  const INITIAL_STATE = {
    chores: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NEW_GROUP_CREATED:
        return { ...state, loading: false };
      case LOADING:
        return { ...state, loading: true };
      default:
        return state;
    }
  };
  