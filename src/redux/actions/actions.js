import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";
import {
  ADD_SURVEY,
  DELETE_SURVEY,
  GET_SURVEY,
  GET_SURVEY_ID,
  ORDER_CONTACT,
  PUT_SURVEY,
} from "./types";

export const addSurvey = (survey) => {
  return async (dispatch) => {
    try {
      await axios.post(`${ENDPOINT}survey`, survey);
      return dispatch({ type: ADD_SURVEY, payload: survey });
    } catch (error) {
      return error.message;
    }
  };
};

export const getSurvey = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ENDPOINT}survey`);
      const survey = response.data;
      return dispatch({ type: GET_SURVEY, payload: survey });
    } catch (error) {
      return error.message;
    }
  };
};
export const surveyEdit = (surveyId, editSurvey) => {
  return async (dispatch) => {
    // console.log("id: ", surveyId);
    // console.log("cuerpo: ", editSurvey);
    try {
      await axios.put(`${ENDPOINT}survey/${surveyId}`, editSurvey);

      return dispatch({
        type: PUT_SURVEY,
        payload: { surveyId, editSurvey },
      });
    } catch (error) {
      return error.message;
    }
  };
};
export const getSurveyId = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${ENDPOINT}survey/${id}`)
        .then((response) => {
          // console.log(response.data);
          dispatch({ type: GET_SURVEY_ID, payload: response.data });
          resolve();
        })
        .catch((error) => {
          throw new Error("Error fetching survey details.");
        });
    });
  };
};

export const deleteSurvey = (itemId) => async (dispatch) => {
  try {
    await axios.delete(`${ENDPOINT}survey/${itemId}`);
    dispatch({ type: DELETE_SURVEY, payload: itemId });
  } catch (error) {
    console.error("Error deleting survey:", error);
    return error.message;
  }
};
export const orderContact = (contact) => async (dispatch) => {
  try {
    const response = await axios.get(`${ENDPOINT}surveycontact/${contact}`);
    console.log(response.data)
    dispatch({ type: ORDER_CONTACT, payload: response.data });
  } catch (error) {
    console.error("Error order survey:", error);
    return error.message;
  }
};