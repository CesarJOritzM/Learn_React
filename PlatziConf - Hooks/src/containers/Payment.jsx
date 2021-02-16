import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';
import { handleSumTotal } from '../utils';
import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payment = ( { history } ) => {
  const { state,addNewOrder  } = useContext(AppContext);
  const { cart,buyer, } = state;
  const paypalOtions = {
    clientId:
      'Ad4_m-ItyGjV8XCWfGt4VuLSUdzAkIkUEQV0RXeROAyLKW7HZV-jkEVBSTcj_jhiYgNZN1vg_3S1Dd3k',
    intent: 'capture',
    currency: 'USD',
  };
  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };
  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  }
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resument del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>
                $
                {' '}
                {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOtions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
}

export default Payment;