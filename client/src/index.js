import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
/*
--> First argument is all the diference reducer inside my application
--> Second argument is the initial state of my application, this is most relevant when we are working in server side rendering,
    by this project we don't really care to much about the initial state so I'm just gonna leave an empty object
--> Finally apply middleware
*/
const store = createStore(reducers, {}, applyMiddleware())
ReactDom.render(
    //create a store a redux store at the very top level of my application
    //and hook it up in the react application by placing the provider tag
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);