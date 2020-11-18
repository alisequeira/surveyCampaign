//SurveyForm show a form for a user to add input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
/**
 * The Field component is a helper provided by redux form
 * rendering absolutely any type of treditional HTML form element
 * (text areas, text inputs, file inputs, checkboxes, radio buttons..etc)
 * 
 * HandleSubmit is a function provided by reduxForm helper that we wireUp at the bottom
 */
class SurveyForm extends React.Component {

    renderFields = () => {
        return (
            <div>
                <Field type="text" name="surveyTitle" component={SurveyField} />
            </div>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);