import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channel: null,
  loading: true,
  longOfText: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        channel: action.payload,
        loading: false,
        longOfText: action.payload.length
      };
    // case actionTypes.POST_MESSAGE:
    //   return {
    //     ...state,
    //     channel: state.channel.concat(action.payload)
    //   };

    default:
      return state;
  }
};

export default reducer;
