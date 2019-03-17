import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channel: null,
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        channel: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
