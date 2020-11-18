//SurveyNew show SurveyForm and SurveyFormReview
import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyFrom';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showFormReview: false };
    }

    renderContent = () => {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

//this clear the form when we hit the cancel button
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);