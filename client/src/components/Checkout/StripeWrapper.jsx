// client/src/components/Checkout/StripeWrapper.jsx

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0f172a',
    borderRadius: '12px',
    fontFamily: 'inherit',
  },
};

export default function StripeWrapper({ children }) {
  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      {children}
    </Elements>
  );
}