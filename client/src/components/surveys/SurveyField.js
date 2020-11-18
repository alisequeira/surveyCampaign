//SurveyField contains logic to render a single
// label and text input

// {...input} we are passing all the events handlers of prop.input instead of doing one by one onBlur={prop.input.onBlur}
//meta is a property that reduxForm pass as props into child component
import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};