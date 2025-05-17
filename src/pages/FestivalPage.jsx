import React, { useEffect, useState } from "react";

function FestivalPage({ darkMode, selectedFestival }) {
  
      const [festival, setFestival] = useState(null);
      
        useEffect(() => {
          if (selectedFestival) {
            // Ha van kiválasztott fesztivál propban, akkor beállítjuk
            setFestival(selectedFestival);
          }
        }, [selectedFestival]);
      
        if (!festival) return <p className="mt-16 text-4xl text-green-600 text-center">No festival selected</p>;
      
        return (
          <div className={`max-w-5xl mx-auto py-12 px-4 ${darkMode ? "text-white" : "text-black"}`}>
            <h1 className="text-4xl font-bold mb-6">{festival.name}</h1>
            <img src={festival.image} alt={festival.name} className="w-full h-96 object-cover rounded-lg mb-6" />
            <p className="text-lg mb-4">{festival.description}</p>
            <div className="mt-4 text-xl space-y-2">
              <p><strong>Location:</strong> {festival.location}</p>
              <p><strong>Date:</strong> {festival.dateStart} – {festival.dateEnd}</p>
              <p><strong>Genres:</strong> {festival.genre.join(", ")}</p>
              <p><strong>Tickets Available:</strong> {festival.ticketAvailable}</p>
              <p><strong>Basic Ticket:</strong> €{festival.basicPrice}</p>
                            <p><strong>Premium Ticket:</strong> €{festival.premiumPrice}</p>

              <p><strong>VIP Price:</strong> €{festival.vipPrice}</p>

            </div>
          </div>
        );
      }
      
      


export default FestivalPage;