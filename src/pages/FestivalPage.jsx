import React, { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FestivalPage({ darkMode, selectedFestival, cart, setCart }) {
  const [festival, setFestival] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFestival) {
      setFestival(selectedFestival);
    }
  }, [selectedFestival]);

  const addToCart = (type, price) => {
    if (!festival) return;
    const ticketKey = `${festival.name}_${type}_${festival.dateStart}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.key === ticketKey);
      if (existingItem) {
        return prevCart.map((item) =>
          item.key === ticketKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            key: ticketKey,
            name: festival.name,
            date: festival.dateStart,
            type,
            price,
            quantity: 1,
          },
        ];
      }
    });
    setCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
  setCartOpen(false);
  navigate("/checkout");
};


  if (!festival)
    return (
      <p className="mt-16 text-4xl text-green-600 text-center">
        No festival selected
      </p>
    );

  return (
    <div
      className={`relative max-w-7xl mx-auto py-6 lg:py-24 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-5xl font-bold mb-6">{festival.name}</h1>

      <img
        src={festival.image}
        alt={festival.name}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <h2 className="text-3xl font-bold mb-6 text-right">Get your ticket now</h2>

      <p>{festival.description}</p>
      <p>Genres: {festival.genre.join(", ")}</p>

      <div className="mt-4 font-semibold text-xl space-y-2">
        <p>Location: {festival.location}</p>
        <p>
          Starting: {new Date(festival.dateStart).toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p>
          Last day: {new Date(festival.dateEnd).toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p>Tickets Available: {festival.ticketAvailable}</p>

        <table className="text-3xl w-full mt-6">
          <tbody>
            <tr>
              <td>Basic Ticket</td>
              <td>{festival.basicPrice} €</td>
              <td>
                <button
                  onClick={() => addToCart("Basic", festival.basicPrice)}
                  className="bg-green-500 py-4 px-8 rounded-full hover:bg-green-700"
                >
                  Buy now
                </button>
              </td>
            </tr>
            <tr>
              <td>Premium Ticket</td>
              <td>{festival.premiumPrice} €</td>
              <td>
                <button
                  onClick={() => addToCart("Premium", festival.premiumPrice)}
                  className="bg-green-500 py-4 px-8 rounded-full hover:bg-green-700"
                >
                  Buy now
                </button>
              </td>
            </tr>
            <tr>
              <td>VIP Ticket</td>
              <td>{festival.vipPrice} €</td>
              <td>
                <button
                  onClick={() => addToCart("VIP", festival.vipPrice)}
                  className="bg-green-500 py-4 px-8 rounded-full hover:bg-green-700"
                >
                  Buy now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setCartOpen((prev) => !prev)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ShoppingCart size={28} />
        </button>

        {cartOpen && (
          <div
            className={`mt-2 w-80 shadow-xl rounded-xl p-4 absolute bottom-16 right-0 ${
              darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm">No items yet</p>
            ) : (
              <>
                <ul className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {cart.map((item, index) => (
                    <li key={index} className="text-sm border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p>
                            {item.type} Ticket – {item.price} € x {item.quantity}
                          </p>
                          <p className="text-xs">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-sm font-semibold mb-2">
                  Total: {getTotal()} €
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FestivalPage;
