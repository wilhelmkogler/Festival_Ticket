import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Summary = ({ darkMode }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const pdfRefs = useRef({});

  const handleDownloadPDF = async (item) => {
    const pdfRef = pdfRefs.current[item._id];
    if (!pdfRef) return;

    await new Promise((resolve) => setTimeout(resolve, 100));
    const canvas = await html2canvas(pdfRef, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
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
    pdf.save(`ticket_${item.name.replace(/\s+/g, "_")}.pdf`);
  };

  useEffect(() => {
    fetch("http://192.168.1.7:5000/api/orders/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrder(data);
        }
      })
      .catch(() => setError("Hiba a rendelés lekérésekor"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Betöltés...</p>;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  return (
    <div
      className={`max-w-7xl mx-4 lg:mx-auto py-6 my-12 lg:mt-40 p-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16 text-center">
        Summary
      </h1>

      <div className={`rounded-3xl p-6 ${darkMode ? "bg-sotet" : "bg-white"}`}>
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

        {/* Asztali nézethez táblázat */}
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
                    className="bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-800"
                    type="button"
                  >
                    Download PDF
                  </button>
                  <div style={{ position: "absolute", left: "-9999px" }}>
                    <div
                      ref={(el) => (pdfRefs.current[item._id] = el)}
                      className="bg-white rounded-xl w-[380px] sm:w-[420px] p-4 text-black"
                    >
                      <div className="relative w-full h-20 mb-4">
                        <img
                          src="img/wall.png"
                          alt="Banner"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[55%]">
                          <p
                            className="text-transparent text-3xl font-semibold"
                            style={{ WebkitTextStroke: "1px white" }}
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-around gap-6">
                        <div className="text-xs text-left">
                          <p>
                            <strong>Name:</strong> {order.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {order.phone}
                          </p>
                          <p className="mt-4">
                            <strong>Festival:</strong> {item.name}
                          </p>
                          <p>
                            <strong>Location:</strong> {item.location}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(item.dateStart).toLocaleDateString("en-GB")}{" "}
                            - {new Date(item.dateEnd).toLocaleDateString("en-GB")}
                          </p>
                          <p>
                            <strong>Type:</strong> {item.type}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                          <p>
                            <strong>Price:</strong> {item.price} €
                          </p>
                        </div>
                        <div className="mt-4 text-center">
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
                          <p className="mt-2 text-sm">{item.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobil nézethez kártyák */}
        <div className="block lg:hidden mt-10 space-y-6">
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${
                darkMode ? "border-white" : "border-black"
              }`}
            >
              <p><strong>Festival:</strong> {item.name}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.dateStart).toLocaleDateString("en-gb")} -{" "}
                {new Date(item.dateEnd).toLocaleDateString("en-gb")}
              </p>
              <p><strong>Ticket:</strong> {item.type}</p>
              <p><strong>Price:</strong> {item.price} €</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Total:</strong> {item.price * item.quantity} €</p>
              <button
                onClick={() => handleDownloadPDF(item)}
                className="mt-4 bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-800"
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
