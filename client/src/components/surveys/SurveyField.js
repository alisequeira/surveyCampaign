//SurveyField contains logic to render a single
// label and text input

// {...input} we are passing all the events handlers of prop.input instead of doing one by one onBlur={prop.input.onBlur}
import React from 'react'

export default ({ input }) => {
    return (
        <div>
            <input {...input} />
        </div>
    );
};