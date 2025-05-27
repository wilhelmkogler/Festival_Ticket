import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe as loadStripeInstance } from "@stripe/stripe-js";

const stripePromise = loadStripeInstance(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

function CheckoutForm({ cart, setCart, darkMode }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const amountInCents = Math.round(total * 100);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stripe/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful! 🎉");

      // ⬇️ Először rendelés mentése
      await fetch(`${import.meta.env.VITE_API_URL}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          items: cart,
          totalAmount: total,
          paymentIntentId: result.paymentIntent.id,
        }),
      });

      setCart([]);
      navigate("/"); // ⬅️ csak a végén dobjon át
    }

    setLoading(false);
  };

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:py-24 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-16 text-center">
        Checkout
      </h1>

      <div
        id="checkoutform"
        className={`flex gap-16 rounded-3xl p-6 ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-2/3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Your Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-lg mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  placeholder="Wilhelm Kogler"
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full text-md px-4 py-2 rounded-xl border-2 ${
                    darkMode
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-black border-black"
                  }`}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-lg mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  placeholder="+406941984161"
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full text-md px-4 py-2 rounded-xl border-2 ${
                    darkMode
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-black border-black"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-1">Email Address</label>
              <input
                type="email"
                required
                value={customerEmail}
                placeholder="contact@wilhelmkogler.com"
                onChange={(e) => setCustomerEmail(e.target.value)}
                className={`w-full text-md px-4 py-2 rounded-xl border-2 ${
                  darkMode
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-black border-black"
                }`}
              />
            </div>




            <div>
              <label className="block text-lg mb-1">Card Details</label>
              <div className={`border-2 rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-black border-black"
                }`}>
                <CardElement />
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg"
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </form>
        </div>

        <div className=" w-1/3">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Your Tickets
          </h2>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="mb-6 space-y-4 text-right">
              {cart.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="text-xl font-semibold">{item.name}</p>
                  <p className="text-lg">
                    {item.quantity} x {item.type} Ticket – {item.price} €
                  </p>
                  <p className="text-md">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <p className="text-3xl text-right font-semibold mb-6">
            Total: {total} €
          </p>
        </div>
      </div>
    </div>
  );
}

function Checkout(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

export default Checkout;
