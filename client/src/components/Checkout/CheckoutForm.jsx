// client/src/components/Checkout/CheckoutForm.jsx

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#0f172a',
      fontFamily: 'inherit',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444' },
  },
  hidePostalCode: true,
};

export default function CheckoutForm({
  formData,
  cartItems,
  paymentMethod,
  cartTotal,
  discountAmount,
  couponCode,
  finalShipping,
  finalTotal,
  token,
  onSuccess,
  onBack,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCardError('');

    try {
      // Step 1: Create order in your DB first (status: pending)
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const orderRes = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          formData,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          paymentMethod,
          cartTotal,
          discountAmount,
          finalShipping,
          finalTotal,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || 'Failed to create order');
      }

      const { _id: orderId } = await orderRes.json();

    
const RS_TO_AUD = 0.0042;
const amountInAUD = parseFloat((finalTotal * RS_TO_AUD).toFixed(2));

const intentRes = await fetch(`${API_URL}/api/payment/create-payment-intent`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    amount: amountInAUD,
    currency: 'aud',
    orderId,
  }),
});

      if (!intentRes.ok) throw new Error('Failed to initialize payment');
      const { clientSecret } = await intentRes.json();

      // Step 3: Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        setCardError(error.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess({ cartTotal, discountAmount, couponCode, finalShipping, finalTotal });
      }

    } catch (err) {
      setCardError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Card Input Box */}
      <div className="border-2 border-gray-200 rounded-xl p-5 focus-within:border-black transition-all mb-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">
          Card Details
        </label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {/* Error Message */}
      {cardError && (
        <p className="text-red-500 text-sm mb-4">{cardError}</p>
      )}

      <p className="text-xs text-gray-400 mb-6">
        🔒 Your payment is secured by Stripe. We never store your card details.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-14 bg-white text-black border-2 border-gray-200 rounded-xl font-bold hover:border-black transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-all shadow-xl disabled:opacity-50"
        >
         {loading ? 'Processing...' : `Pay Rs ${finalTotal.toLocaleString()} (~$${amountInAUD} AUD) →`}
        </button>
      </div>
    </form>
  );
}