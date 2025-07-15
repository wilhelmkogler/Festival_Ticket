import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import ReactDOM from "react-dom/client";

const Summary = ({ darkMode }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleDownloadPDF = async (item) => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    const element = document.createElement("div");
    container.appendChild(element);

    const root = ReactDOM.createRoot(element);
    root.render(
      <div
        style={{
          background: "white",
          width: 420,
          padding: 4,
          fontSize: 12,
          color: "black",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 80,
            marginBottom: 16,
          }}
        >
          <img
            src="img/wall.png"
            alt="Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {item.name}
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <div>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone}
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>Festival:</strong> {item.name}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.dateStart).toLocaleDateString("en-gb", {
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                day: "numeric",
                month: "long",
              })}
              ,{" "}
              {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Ticket:</strong> {item.type}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Price:</strong> {item.price} €
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <QRCodeCanvas
              value={JSON.stringify({
                customer: {
                  name: order.name,
                  email: order.email,
                  phone: order.phone,
                },
                ticket: item,
              })}
              size={120}
            />
            <p style={{ marginTop: 8 }}>{item.type}</p>
          </div>
        </div>
      </div>
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`ticket_${item.name.replace(/\s+/g, "_")}.pdf`);

    root.unmount();
    document.body.removeChild(container);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrder(data);
        }
      })
      .catch(() => setError("Error accessing the order"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Loading...</p>;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`max-w-7xl lg:mx-auto py-6 my-12 lg:mt-40 p-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16 text-center">
        Summary
      </h1>

      <div
        className={`rounded-3xl p-4 lg:p-6 ${
          darkMode ? "bg-sotet" : "bg-white"
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <p className="text-xl lg:text-3xl">
            Thank you for your purchase <strong>{order.name}</strong>!
          </p>
          <div className="text-md lg:text-lg">
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
          className={`w-full text-center table-auto border mt-10 lg:mt-14 hidden lg:table ${
            darkMode ? "border-white" : "border-black"
          }`}
        >
          <thead
            className={`text-xl ${
              darkMode ? "bg-gray-500 text-white" : "bg-black text-white"
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
              <th className="p-2 border">Download</th>
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
                  -{" "}
                  {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                    day: "numeric",
                    month: "long",
                  })}
                  ,{" "}
                  {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border">{item.price} €</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.price * item.quantity} €</td>
                <td className="p-4 border text-center">
                  <button
                    onClick={() => handleDownloadPDF(item)}
                    className="bg-lila text-white w-full py-2 rounded-xl hover:bg-purple-700"
                    type="button"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="block lg:hidden mt-10 space-y-6">
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${
                darkMode ? "border-white" : "border-black"
              }`}
            >
              <p>
                <strong>Festival:</strong> {item.name}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.dateStart).toLocaleDateString("en-gb", {
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                  day: "numeric",
                  month: "long",
                })}
                ,{" "}
                {new Date(item.dateEnd).toLocaleDateString("en-gb", {
                  year: "numeric",
                })}
              </p>
              <p>
                <strong>Ticket:</strong> {item.type}
              </p>
              <p>
                <strong>Price:</strong> {item.price} €
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Total:</strong> {item.price * item.quantity} €
              </p>
              <button
                onClick={() => handleDownloadPDF(item)}
                className="mt-4 bg-lila text-white w-full py-2 rounded-xl hover:bg-purple-800"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>

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
