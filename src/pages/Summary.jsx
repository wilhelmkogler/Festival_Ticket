import { useEffect, useState } from "react";

const Summary = ({ darkMode }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const subtotal = order.items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrder(data);
        }
      })
      .catch((err) => setError("Hiba a rendelés lekérésekor"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Betöltés...</p>;

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:py-24 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-16 text-center">
        Summary
      </h1>

      <div
        className={`rounded-3xl p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-between items-center">
          <p className="text-3xl">
            Thank your for your purchase <strong>{order.name}</strong>!
          </p>
          <div className="text-md">
            <p>
              <strong>Order Id:</strong> #{order._id}
            </p>
            <p>
              <strong>Email address:</strong> {order.email}
            </p>
            <p>
              <strong>Phone number:</strong> {order.phone}
            </p>
          </div>
        </div>

        <table
          className={`w-full text-center table-auto border mt-14 ${
            darkMode ? "border-white" : "border-black"
          }`}
        >
          <thead
            className={`text-xl ${
              darkMode ? "bg-slate-600 text-white" : "bg-black text-white"
            }`}
          >
            <tr className="text-2xl">
              <th className="p-2 border">Festival</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Date</th>

              <th className="p-2 border">Ticket</th>

              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr className="text-md" key={index}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.location}</td>

                <td className="p-2 border">
                  {new Date(item.dateStart).toLocaleDateString("en-gb", {
                    day: "numeric",
                  })}{" "}
                  {" - "}
                  {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  {", "}
                  {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border">{item.type}</td>

                <td className="p-2 border">{item.price} €</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.price * item.quantity}€</td>
                <td className="p-4 border text-center">
                  <button
                    className="bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-800"
                    type="button"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <p className="text-2xl text-left">
            <strong>Subtotal:</strong> {subtotal} €
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
