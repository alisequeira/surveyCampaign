import React from 'react';
import Header from './Header';
import { BrowserRouter, Route } from 'react-router-dom';
/**
 * BrowserRouter is the thing that tell react router how to behave
 * Route is a react component that setup the component to navigate
 */

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route exact path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;