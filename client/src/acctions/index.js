import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

/*
  v1. whwnerver the action creator is called it will return a 
  function and it will automatically call it with the dispatch
    
    We then make a request. We wait until we get the response back from our API
    And then once we have the reponse only at that point in time will we actually dispatch our action. 

    export const fetchUser = () => {
        return function (dispatch) {
            axios.get('/api/current_user')
                .then(res => dispatch({ type: FETCH_USER, payload: res }))
        }
    };
  */
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};