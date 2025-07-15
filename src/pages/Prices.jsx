function Prices({ darkMode }) {
  const cards = [
    {
      type: "STANDARD",
      price: 50,
      features: [
        "Free water stations",
        "Outdoor chill zones",
        "General admission",
        "Basic medical support",
        "Festival wristband included",
      ],
      color: "bg-green-200",
    },
    {
      type: "PREMIUM",
      price: 110,
      features: [
        "Priority entry",
        "Dedicated seating zone",
        "Free drink vouchers",
        "Fast-lane security",

        "Access to main events",

        "Premium restrooms",

        "Exclusive festival merchandise",
      ],
      color: "bg-purple-300",
    },
    {
      type: "VIP",
      price: 245,
      features: [
        "All PREMIUM benefits",
        "Backstage access",
        "Exclusive lounge",
        "VIP parking pass",
        "Complimentary food & drinks",

        "Meet & greet with artists",
        "24/7 concierge support",
      ],
      color: "bg-yellow-200",
    },
  ];

  return (
    <div
      className={`max-w-7xl lg:mx-auto py-6 my-12 lg:mt-40 p-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16 text-center">
        Prices
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex-1 ${
              card.color
            } rounded-2xl shadow-lg p-6 flex flex-col justify-between ${
              darkMode ? "text-red-800" : "text-black"
            }`}
          >
            <div className="flex flex-col justify-around gap-10 mb-10">
              <h2 className="text-xl lg:text-3xl font-bold text-center mb-2">
                {card.type}
              </h2>

              <div className="flex flex-wrap flex-col lg:flex-row text-center gap-4 mb-6">
                {card.features.map((feature, i) => (
                  <span
                    key={i}
                    className={`text-xs lg:text-sm font-semibold px-4 py-2 rounded-full shadow ${
                      darkMode ? "bg-sotet text-white" : "bg-white text-sotet"
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <p className="relative bottom-0 left-0 text-center text-lg lg:text-2xl font-bold">
              Starting: {card.price} €
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prices;
