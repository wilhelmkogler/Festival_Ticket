import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Summary = ({ darkMode }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const pdfRef = useRef();

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`ticket_${selectedItem.name.replace(/\s+/g, "_")}.pdf`);
  };

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

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:mt-40 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-16 text-center">
        Summary
      </h1>

      <div className={`rounded-3xl p-8 ${darkMode ? "bg-sotet" : "bg-white"}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <p className="text-xl lg:text-3xl">
            Thank your for your purchase <strong>{order.name}</strong>!
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
          className={`w-full text-center table-auto border mt-10 lg:mt-14 ${
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
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                    className="bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-800"
                    type="button"
                  >
                    View
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
      {showModal &&
        selectedItem &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg relative w-fit max-w-full">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-4 text-lg font-bold text-gray-600 hover:text-black"
              >
                ×
              </button>

              <div
                ref={pdfRef}
                className="bg-white rounded-xl w-[380px] sm:w-[420px] p-0"
              >
                <img src="img/wall.png" alt="Banner" className="w-full h-20" />

                <div className="flex p-4">
                  <div className="text-sm px-1">
                    <p>
                      <strong>Name:</strong> {order.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                    <p className="mt-2">
                      <strong>Festival:</strong> {selectedItem.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedItem.location}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedItem.dateStart).toLocaleDateString(
                        "en-GB"
                      )}{" "}
                      -{" "}
                      {new Date(selectedItem.dateEnd).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedItem.type}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {selectedItem.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> {selectedItem.price} €
                    </p>
                  </div>

                  <div className="mx-auto pt-2 font-bold text-center">
                    <QRCodeCanvas
                      value={JSON.stringify({
                        customer: {
                          name: order.name,
                          email: order.email,
                          phone: order.phone,
                        },
                        ticket: selectedItem,
                      })}
                      size={150}
                    />
                    <p className="mt-2"> {selectedItem.type}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl w-full"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Summary;
