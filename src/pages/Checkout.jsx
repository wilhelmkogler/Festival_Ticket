import React from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart, darkMode }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order confirmed! 🎉");
    setCart([]);
    navigate("/");
  };

 const total = Array.isArray(cart)
  ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  : 0;


  return (
    <div
      className={`max-w-4xl mx-auto px-6 py-12 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

      <h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="mb-6 space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{item.name}</p>
              <p>
                {item.type} Ticket – {item.price} € x {item.quantity}
              </p>
              <p className="text-xs">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xl font-semibold mb-6">Total: {total} €</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded border"
          />
        </div>

        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 rounded border"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            required
            className="w-full px-4 py-2 rounded border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
