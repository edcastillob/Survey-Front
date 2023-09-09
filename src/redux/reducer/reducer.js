import {
  ADD_SURVEY,
  DELETE_SURVEY,
  GET_SURVEY,
  GET_SURVEY_ID,
  PUT_SURVEY,
} from "../actions/types";

const initialState = {
  survey: [],
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case ADD_SURVEY:
      return {
        ...state,
        survey: actions.payload,
      };
    case GET_SURVEY:
      return {
        ...state,
        survey: actions.payload,
      };
    case PUT_SURVEY:
      const { surveyId, updatedSurvey } = actions.payload;
      return {
        ...state,
        survey: state.survey.map((survey) =>
          survey.id === surveyId ? { ...survey, ...updatedSurvey } : survey
        ),
      };

    case GET_SURVEY_ID:
      return {
        ...state,
        survey: actions.payload,
      };
    case DELETE_SURVEY:
      const updatedSurveyAll = state.survey.filter(
        (survey) => survey.id !== actions.payload
      );
      return {
        ...state,
        survey: updatedSurveyAll,
      };

    default:
      return state;
  }
}

export default reducer;
