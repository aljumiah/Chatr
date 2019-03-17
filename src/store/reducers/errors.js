import { SET_ERRORS } from "../actions/actionTypes";

const initialState = {
  errors: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return Object.keys(action.payload).map(
        key => `${key}: ${action.payload[key]}`
      );
    default:
      return state;
  }
};

export default reducer;
