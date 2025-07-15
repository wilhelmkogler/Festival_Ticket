function Cities({ darkMode }) {
  const cities = [
    { city: "Barcelona", country: "Spain", image: "/img/cities/barcelona.jpg" },
    { city: "Berlin", country: "Germany", image: "/img/cities/berlin.jpg" },

    { city: "Lisbon", country: "Portugal", image: "/img/cities/lisbon.jpg" },

    {
      city: "Montreux",
      country: "Switzerland",
      image: "/img/cities/montreux.jpg",
    },
    { city: "Budapest", country: "Hungary", image: "/img/cities/budapest.jpg" },

    { city: "Athens", country: "Greece", image: "/img/cities/athens.jpg" },
    {
      city: "Amsterdam",
      country: "Netherlands",
      image: "/img/cities/amsterdam.jpg",
    },
    { city: "Paris", country: "France", image: "/img/cities/paris.jpg" },
    { city: "Dublin", country: "Ireland", image: "/img/cities/dublin.jpg" },
  ];

  return (
    <div
      className={`max-w-7xl lg:mx-auto py-6 my-12 lg:mt-40 p-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16 text-center">
        Choose your City
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {cities.map(({ city, country, image }, index) => (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden shadow-lg ${
              darkMode ? "bg-sotet text-white" : "bg-white text-sotet"
            }`}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={city}
                className="aspect-[16/9] w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg lg:text-2xl font-bold mb-4">{city}</h2>
              <p className="text-xs lg:text-lg ">{country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;
