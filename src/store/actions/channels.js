import * as actionTypes from "./actionTypes";

// AC
import { setErrors } from "./errors";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannels = () => {
  return async dispatch => {
    try {
      // to fetch from api
      let response = await instance.get("channels/");
      // to get data from object reponse
      let channels = response.data;
      //to send to reducer
      dispatch({
        type: actionTypes.FETCH_CHANNELS,
        payload: channels
      });
    } catch (error) {
      //incase there is an error
      console.error(error);
      console.log("there is an error ferching the channels");
    }
  };
};

export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query.toLowerCase()
  };
};

export const postChannel = (channel, reset, history) => {
  return async dispatch => {
    try {
      const res = await instance.post("channels/create/", channel);
      const newChannel = res.data;
      dispatch({
        type: actionTypes.POST_CHANNEL,
        payload: newChannel
      });
      reset();
      history.push(`/channels/${newChannel.id}`);
    } catch (error) {
      if (error.response) dispatch(setErrors(error.response.data));
      else console.error(error);
    }
  };
};
