import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payment extends React.Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 emails credicts"
                amount={500}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">ADD credicts</button>
            </StripeCheckout>
        );
    }
}
//the amount prop is means to be cents 500 cents => 5 dlrs
export default Payment;