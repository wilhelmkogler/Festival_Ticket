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
  const [error, setError] = useState("");

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
    fetch("http://localhost:5000/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents, cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError("");

    try {
      // 2. Fizetés végrehajtása
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // 3. Rendelés mentése az adatbázisba
      const orderRes = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          items: cart, // fontos! ne legyen stringify-olva!
        }),
      });

      if (!orderRes.ok) throw new Error("Order saving failed");

      // 4. Sikeres fizetés
      setCart([]);
      navigate("/summary");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:mt-40 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-16 text-center">
        Checkout
      </h1>

      <div
        id="checkoutform"
        className={`flex flex-col-reverse lg:flex-row justify-between gap-10 rounded-3xl p-6 ${
          darkMode ? "bg-sotet text-white" : "bg-white text-black"
        }`}
      >
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl lg:text-3xl text-center lg:text-left font-semibold mb-8">
            DETAILS
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <label className="block text-md lg:text-lg mb-1">
                  Full Name
                </label>
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

              <div className="w-full lg:w-1/2">
                <label className="block text-md lg:text-lg mb-1">
                  Phone Number
                </label>
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
              <label className="block text-md lg:text-lg mb-1">
                Email Address
              </label>
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
              <label className="block text-md lg:text-lg mb-1">
                Card Details
              </label>
              <div
                className={`border-2 rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-black border-black"
                }`}
              >
                <CardElement />
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-lila hover:bg-puple-700"
              } text-white py-3 rounded-full text-lg`}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/4">
          <h2 className="text-xl lg:text-3xl text-center lg:text-left font-semibold mb-8">
            TICKETS
          </h2>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <div className="mb-6 text-md space-y-6">
              {Object.entries(
                cart.reduce((acc, item) => {
                  if (!acc[item.name]) acc[item.name] = [];
                  acc[item.name].push(item);
                  return acc;
                }, {})
              ).map(([festivalName, tickets], idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md lg:text-xl font-bold">
                      {festivalName}
                    </h3>
                    <p>
                      {new Date(tickets[0].dateStart).toLocaleDateString(
                        "en-gb",
                        {
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500">{tickets[0].location}</p>
                    <p>
                      {new Date(tickets[0].dateStart).toLocaleDateString(
                        "en-gb",
                        {
                          day: "numeric",
                        }
                      )}
                      {" - "}{" "}
                      {new Date(tickets[0].dateEnd).toLocaleDateString(
                        "en-gb",
                        {
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {tickets.map((ticket, i) => (
                      <li key={i} className="text-sm">
                        <div className="flex justify-between">
                          <p>
                            {ticket.quantity} x {ticket.type} Ticket
                          </p>
                          <p className="font-bold">{ticket.price} € </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <p className="text-xl lg:text-3xl text-right font-semibold mb-6">
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
