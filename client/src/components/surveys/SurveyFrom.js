//SurveyForm show a form for a user to add input
import _ from 'lodash'
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validdateEmails from '../../utils/validateEmails'
/**
 * The Field component is a helper provided by redux form
 * rendering absolutely any type of treditional HTML form element
 * (text areas, text inputs, file inputs, checkboxes, radio buttons..etc)
 * 
 * HandleSubmit is a function provided by reduxForm helper that we wireUp at the bottom
 */

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "emails" }
]
class SurveyForm extends React.Component {

    renderFields = () => {
        return _.map(FIELDS, field => {
            return <Field key={field.name} label={field.label} name={field.name} component={SurveyField} type="text" />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validdateEmails(values.emails || '')
    _.forEach(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a value`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);