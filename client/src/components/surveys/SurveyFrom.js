//SurveyForm show a form for a user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
/**
 * The Field component is a helper provided by redux form
 * rendering absolutely any type of treditional HTML form element
 * (text areas, text inputs, file inputs, checkboxes, radio buttons..etc)
 * 
 * HandleSubmit is a function provided by reduxForm helper that we wireUp at the bottom
 */
class SurveyForm extends React.Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    <Field type="text" name="surveyTitle" component="input" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);