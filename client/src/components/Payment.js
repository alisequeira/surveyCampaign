import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payment extends React.Component {
    render() {
        return (
            <StripeCheckout
                amount={500}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}
//the amount prop is means to be cents 500 cents => 5 dlrs
export default Payment;