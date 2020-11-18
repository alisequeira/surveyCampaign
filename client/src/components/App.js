import React from 'react';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../acctions';//import all the actions creator from acctions/index.js file
/**
 * BrowserRouter is the thing that tell react router how to behave
 * Route is a react component that setup the component to navigate
 */

class App extends React.Component {

    componentDidMount = () => {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route exact path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);