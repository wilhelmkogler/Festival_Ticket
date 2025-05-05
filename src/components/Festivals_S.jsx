import React, { useEffect, useState } from "react";

function Festival({ darkMode }) {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/festivals")
      .then((res) => res.json())
      .then((data) => {
        setFestivals(data);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:py-12 px-4 ${
        darkMode ? " text-white" : " text-black"
      }`}
    >
      <h1
        className={`${
          darkMode ? "text-white" : "text-black"
        } text-3xl lg:text-4xl font-bold mb-16 text-center`}
      >
        Browse Festivals
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {festivals.map((festival) => (
            <div
              key={festival._id}
              className={`rounded-xl shadow-md p-6 transition transform  ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <img
                src={festival.image}
                alt={festival.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold">{festival.name}</h2>
              <p className="text-sm text-gray-400">{festival.location}</p>
              <p className="text-sm mt-2">{festival.description}</p>
              <p className="mt-2 font-medium">{festival.priceRange}</p>
              <p className="text-sm">Tickets: {festival.ticketAvailable}</p>
              <p className="font-bold text-lg mt-8 text-center">
                Starts:{" "}
                {new Date(festival.dateStart).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <button className="w-full bg-green-500 text-white text-xl lg:text-3xl py-4 px-16 mt-4 rounded-full transition-all duration-150 hover:bg-green-600">Select</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Festival;
