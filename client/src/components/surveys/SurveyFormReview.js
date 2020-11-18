//SurveyFormReview show users their form inputs for review
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formfields from './formField';
import * as actions from '../../acctions'

const SurveyReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = _.map(formfields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 btn-flat white-text"
                onClick={onCancel}
            >
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right white-text">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(SurveyReview);