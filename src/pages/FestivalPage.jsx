import React, { useEffect } from "react";
import { ShoppingCart, X, CalendarDays, Ticket, MapPin } from "lucide-react";
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
          item.key === ticketKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            key: ticketKey,
            name: festival.name,
            dateStart: festival.dateStart,
            dateEnd: festival.dateEnd,
            location: festival.location,
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
      <p className="mt-44 text-5xl text-red-600 text-center">
        No festival selected
      </p>
    );

  return (
    <div
      className={`relative max-w-7xl mx-8 lg:mx-auto rounded-3xl my-12 mt-16 lg:mt-56 p-4 ${
        darkMode ? "bg-sotet text-white" : "bg-white text-black"
      }`}
    >
      <img
        src={festival.image}
        alt={festival.name}
        className="w-full h-50 lg:h-96 object-cover rounded-lg mb-6"
      />

      <div className="px-4 mb-10">
        <h1 className="text-4xl lg:text-6xl text-center font-bold mb-10">
          {festival.name}
        </h1>
        <p className="text-xl lg:text-2xl text-center">
          {festival.description}
        </p>
        <p className="mt-4 text-md lg:text-xl text-center">
          {festival.genre.join(" | ")}
        </p>
      </div>

      {/*desktop view*/}
      <div className="hidden mt-16 lg:flex justify-evenly gap-6">
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="text-2xl flex items-center gap-4">
            <MapPin size={32} />
            <p>{festival.location}</p>
          </div>

          <div className="bg-standard rounded-3xl px-24 py-6 text-xl flex flex-col justify-between items-center gap-4">
            <p className="text-2xl font-serif">STANDARD</p>

            <p className="text-5xl font-bold">{festival.basicPrice} €</p>
            <button
              onClick={() => addToCart("Basic", festival.basicPrice)}
              className="bg-green-500 mt-4 py-2 px-8 rounded-full hover:bg-green-700"
            >
              Buy Ticket
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-4">
          <div className="text-2xl flex items-center gap-4">
            <CalendarDays size={32} />
            {new Date(festival.dateStart).toLocaleDateString("en-gb", {
              day: "numeric",
            })}{" "}
            {" - "}
            {new Date(festival.dateEnd).toLocaleDateString("en-gb", {
              month: "long",
              day: "numeric",
            })}
            {", "}
            {new Date(festival.dateEnd).toLocaleDateString("en-gb", {
              year: "numeric",
            })}
          </div>

          <div className="bg-premium rounded-3xl px-24 py-6 text-xl flex flex-col justify-between items-center gap-4">
            <p className="text-2xl font-serif">PREMIUM</p>

            <p className="text-5xl font-bold">{festival.premiumPrice} €</p>
            <button
              onClick={() => addToCart("Premium", festival.premiumPrice)}
              className="bg-green-500 mt-4 py-2 px-8 rounded-full hover:bg-green-700"
            >
              Buy Ticket
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-16">
          <div className="text-2xl flex items-center gap-4">
            <Ticket size={32} />

            <p> Tickets: {festival.ticketAvailable}</p>
          </div>

          <div className="bg-vip rounded-3xl px-24 py-6 text-xl flex flex-col justify-between items-center gap-4">
            <p className="text-2xl font-serif">VIP</p>

            <p className="text-5xl font-bold">{festival.vipPrice} €</p>
            <button
              onClick={() => addToCart("VIP", festival.vipPrice)}
              className="bg-green-500 mt-4 py-2 px-8 rounded-full hover:bg-green-700"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      </div>

      {/*mobile view */}
      <div className="lg:hidden text-xl flex flex-col gap-10 p-4 mb-8">
        <div>
          <div className="flex items-center gap-4">
            <MapPin size={32} />
            <p>{festival.location}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <CalendarDays size={32} />
            {new Date(festival.dateStart).toLocaleDateString("en-gb", {
              day: "numeric",
            })}{" "}
            {" - "}
            {new Date(festival.dateEnd).toLocaleDateString("en-gb", {
              month: "long",
              day: "numeric",
            })}
            {", "}
            {new Date(festival.dateEnd).toLocaleDateString("en-gb", {
              year: "numeric",
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <Ticket size={32} />

            <p> Tickets: {festival.ticketAvailable}</p>
          </div>
        </div>
      </div>

      <div className="px-2 lg:hidden flex flex-col gap-6">
        <div className="bg-standard rounded-3xl py-4 px-2 flex justify-around items-center">
          <div className="flex flex-col text-center">
            <p className="text-lg font-serif">STANDARD</p>

            <p className="text-xl font-bold">{festival.basicPrice} €</p>
          </div>

          <button
            onClick={() => addToCart("Basic", festival.basicPrice)}
            className="bg-green-500 py-2 px-8 rounded-full hover:bg-green-700"
          >
            Buy Ticket
          </button>
        </div>

        <div className="bg-premium rounded-3xl py-4 px-2 flex justify-around items-center">
          <div className="flex flex-col text-center">
            <p className="text-md font-serif">PREMIUM</p>

            <p className="text-xl font-bold">{festival.premiumPrice} €</p>
          </div>

          <button
            onClick={() => addToCart("Premium", festival.premiumPrice)}
            className="bg-green-500 py-2 px-8 rounded-full hover:bg-green-700"
          >
            Buy Ticket
          </button>
        </div>

        <div className="bg-vip rounded-3xl py-4 px-2 flex justify-around items-center">
          <div className="flex flex-col text-center">
            <p className="text-md font-serif">VIP</p>

            <p className="text-xl font-bold">{festival.vipPrice} €</p>
          </div>

          <button
            onClick={() => addToCart("VIP", festival.vipPrice)}
            className="bg-green-500 py-2 px-8 rounded-full hover:bg-green-700"
          >
            Buy Ticket
          </button>
        </div>
      </div>

      <div className="text-center lg:text-left text-sm lg:text-lg px-0 lg:px-10 pt-6">
        <p>
          Learn more about tickets <span className="text-blue-500">here</span>.
        </p>
      </div>

      <div className="fixed bottom-1 lg:bottom-6 right-1 lg:right-6 z-50">
        <button
          onClick={() => setCartOpen((prev) => !prev)}
          className={`p-2 lg:p-4 rounded-full shadow-lg border-2 hover:scale-110 transition ${
            darkMode
              ? "bg-transparent border-white text-white"
              : "bg-white text-black"
          }`}
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
                            {item.type} Ticket – {item.price} € x{" "}
                            {item.quantity}
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
