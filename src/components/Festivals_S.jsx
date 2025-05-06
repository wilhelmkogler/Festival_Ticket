import React, { useEffect, useState } from "react";

function Festival({ darkMode }) {
  const [festivals, setFestivals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("upcoming");

  const defaultFilters = {
    countries: [],
    genres: [],
    years: [],
    months: [],
    priceMin: "",
    priceMax: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sortFestivals = (festivalsToSort, sortBy = sortOption) => {
    switch (sortBy) {
      case "upcoming":
        return [...festivalsToSort].sort(
          (a, b) => new Date(a.dateStart) - new Date(b.dateStart)
        );
      case "latest":
        return [...festivalsToSort].sort(
          (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
        );
      case "priceLow":
        return [...festivalsToSort].sort((a, b) => a.basicPrice - b.basicPrice);
      case "priceHigh":
        return [...festivalsToSort].sort((a, b) => b.basicPrice - a.basicPrice);
      default:
        return festivalsToSort;
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/festivals")
      .then((res) => res.json())
      .then((data) => {
        const sorted = sortFestivals(data, "upcoming");
        setFestivals(sorted);
        setFiltered(sorted);
        setLoading(false);
      });
  }, []);

  const toggleFilterValue = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filteredList = festivals.filter((f) => {
      const country = f.location.split(", ")[1];
      const inCountry =
        filters.countries.length === 0 || filters.countries.includes(country);
      const inGenre =
        filters.genres.length === 0 ||
        f.genre.some((g) => filters.genres.includes(g));

      const date = new Date(f.dateStart);
      const inYear =
        filters.years.length === 0 ||
        filters.years.includes(date.getFullYear());
      const inMonth =
        filters.months.length === 0 ||
        filters.months.includes(monthNames[date.getMonth()]);

      const min = parseInt(filters.priceMin) || 0;
      const max = parseInt(filters.priceMax) || Infinity;
      const price = f.basicPrice || 0;

      return (
        inCountry &&
        inGenre &&
        inYear &&
        inMonth &&
        price >= min &&
        price <= max
      );
    });

    setFiltered(sortFestivals(filteredList));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setFiltered(sortFestivals(festivals));
  };

  useEffect(() => {
    setFiltered(sortFestivals(filtered));
  }, [sortOption]);

  const allCountries = [
    ...new Set(festivals.map((f) => f.location.split(", ")[1])),
  ];
  const allGenres = [...new Set(festivals.flatMap((f) => f.genre))];
  const allYears = [
    ...new Set(festivals.map((f) => new Date(f.dateStart).getFullYear())),
  ].sort();

  return (
    <div
      className={`max-w-7xl mx-auto py-6 lg:py-24 px-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className={`${darkMode ? "text-white" : "text-black"
    } text-3xl lg:text-5xl font-bold mb-10 text-center`}>Upcoming Festivals</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filter sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-xl font-semibold">Filter</h2>

            <div>
              <label className="font-medium block mb-1">Sort by:</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="upcoming">Start Date (Soonest First)</option>
                <option value="latest">Start Date (Latest First)</option>
                <option value="priceLow">Price (Lowest First)</option>
                <option value="priceHigh">Price (Highest First)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={applyFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 w-full"
              >
                Reset Filters
              </button>
            </div>

            <p className="text-sm text-center font-medium mb-4">
              Showing {filtered.length} festivals
            </p>
            <div className="flex justify-between flex-row-reverse gap-4">
              <div>
                <p className="font-medium mb-1">Country</p>
                <div className="flex flex-wrap gap-2">
                  {allCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => toggleFilterValue("countries", country)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        filters.countries.includes(country)
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">Genre</p>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleFilterValue("genres", g)}
                      className={`px-3 py-1 rounded-full border text-sm ${
                        filters.genres.includes(g)
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium">Year</p>
              <div className="flex flex-wrap gap-2">
                {allYears.map((year) => (
                  <button
                    key={year}
                    className={`px-3 py-1 rounded-full border ${
                      filters.years.includes(year)
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => toggleFilterValue("years", year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium">Month</p>
              <div className="grid grid-cols-3 gap-2">
                {monthNames.map((month) => (
                  <button
                    key={month}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      filters.months.includes(month)
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => toggleFilterValue("months", month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium">Basic Price (€)</p>
              <div className="flex gap-4">

                <input
                type="number"
                name="priceMin"
                placeholder="Min"
                className="border rounded w-1/2 px-2 py-1"
                onChange={handlePriceChange}
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                className="border rounded w-1/2 px-2 py-1"
                onChange={handlePriceChange}
              />
              </div>
              
            </div>
          </div>

          {/* Festival cards */}
          <div className="flex w-full flex-col gap-6">
            {filtered.map((festival) => (
              <div
                key={festival._id}
                className={` rounded-xl shadow-md p-6 transition transform ${
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
                <p className="text-sm">Tickets: {festival.ticketAvailable}</p>
                <p className="text-lg font-bold">
                  From: {festival.basicPrice} €
                </p>
                <p className="font-bold text-lg mt-8 text-center">
                  Starts:{" "}
                  {new Date(festival.dateStart).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button className="w-full bg-green-500 text-white text-xl lg:text-3xl py-4 px-16 mt-4 rounded-full transition-all duration-150 hover:bg-green-600">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Festival;
