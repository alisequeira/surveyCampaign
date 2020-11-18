//SurveyNew show SurveyForm and SurveyFormReview
import React from 'react';
import SurveyForm from './SurveyFrom';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showFormReview: false };
    }

    renderContent = () => {
        if (this.state.showFormReview) {
            return <SurveyFormReview />
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

export default SurveyNew;