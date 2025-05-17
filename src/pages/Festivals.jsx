import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Festivals({ darkMode, setSelectedFestival }) {
  
    const [festivals, setFestivals] = useState([]);
      const [filtered, setFiltered] = useState([]);
      const [loading, setLoading] = useState(true);
      const [sortOption, setSortOption] = useState("upcoming");
      const navigate = useNavigate();
    
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
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-3xl lg:text-5xl font-bold mb-10 text-center`}
          >
            Upcoming Festivals
          </h1>
    
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Filter sidebar */}
              <div className="lg:w-1/3 space-y-6">
                <div>
                  <select
                    className="bg-white text-black w-full border px-3 py-2 rounded-full"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="upcoming">
                      Sorted by Start Date (Soonest First)
                    </option>
                    <option value="latest">
                      Sorted by Start Date (Latest First)
                    </option>
                    <option value="priceLow">Sorted by Price (Lowest First)</option>
                    <option value="priceHigh">
                      Sorted by Price (Highest First)
                    </option>
                  </select>
                </div>
    
                <div className="flex flex-row-reverse gap-2">
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
    
                <p className="text-lg text-center font-medium mb-4">
                  Showing {filtered.length} festivals
                </p>
                <div className="flex justify-between flex-row-reverse gap-4">
                  <div>
                    <p className="font-medium mb-1">Country</p> <hr />
                    <div className="flex flex-wrap mt-2 gap-2">
                      {allCountries.map((country) => (
                        <button
                          key={country}
                          onClick={() => toggleFilterValue("countries", country)}
                          className={`px-3 py-1 rounded-full border-2 text-md hover:scale-125 transition-all duration-300 ${
                            filters.countries.includes(country)
                              ? "bg-orange-500 text-black"
                              : "text-black"
                          } ${
                            darkMode
                              ? "bg-transparent text-white "
                              : "bg-white text-black"
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
    
                  <div>
                    <p className="font-medium mb-1">Genre</p> <hr />
                    <div className="flex flex-wrap mt-2 gap-2">
                      {allGenres.map((g) => (
                        <button
                          key={g}
                          onClick={() => toggleFilterValue("genres", g)}
                          className={`px-3 py-1 rounded-full border-2 text-md hover:scale-125 transition-all duration-300 ${
                            filters.genres.includes(g)
                              ? "bg-orange-500 text-black"
                              : "text-black"
                          } ${
                            darkMode
                              ? "bg-transparent text-white "
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
                  <p className="font-medium">Year</p> <hr />
                  <div className="flex flex-wrap mt-2 gap-2">
                    {allYears.map((year) => (
                      <button
                        key={year}
                        className={`px-3 py-1 rounded-full border-2 text-md hover:scale-125 transition-all duration-300 ${
                          filters.years.includes(year)
                            ? "bg-orange-500 text-black"
                            : "text-black"
                        } ${
                          darkMode
                            ? "bg-transparent text-white "
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
                  <p className="font-medium">Month</p> <hr />
                  <div className="grid grid-cols-3 mt-2 gap-2">
                    {monthNames.map((month) => (
                      <button
                        key={month}
                        className={`px-2 py-2 rounded-full border-2 text-md hover:scale-125 transition-all duration-300 ${
                          filters.months.includes(month)
                            ? "bg-orange-500 text-black"
                            : "text-black"
                        } ${
                          darkMode
                            ? "bg-transparent text-white "
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
                  <p className="font-medium">Price (€)</p> <hr />
                  <div className="flex mt-2 gap-4">
                    <input
                      type="number"
                      name="priceMin"
                      placeholder="Min"
                      className={`${
                        darkMode ? "bg-transparent text-white" : "text-black"
                      } border-2 font-bold text-lg rounded w-1/2 px-2 py-1`}
                      onChange={handlePriceChange}
                    />
                    <input
                      type="number"
                      name="priceMax"
                      placeholder="Max"
                      className={`${
                        darkMode ? "bg-transparent text-white" : "text-black"
                      } border-2 font-bold text-lg rounded w-1/2 px-2 py-1`}
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
                    <div className="flex justify-between items-center text-xl lg:text-3xl font-bold">
                      <p>{festival.name}</p>
                      <p>
                        {" "}
                        {new Date(festival.dateStart).toLocaleDateString("en-US", {
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="mt-1 flex justify-between items-center text-md lg:text-xl font-semibold text-gray-400">
                      <p>{festival.location}</p>
                      <p>
                        {new Date(festival.dateStart).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                        {" - "}
                        {new Date(festival.dateEnd).toLocaleDateString("en-US", {
                          day: "numeric",
                        })}
                      </p>
                    </div>
    
                    <p className="text-sm lg:text-lg text-justify my-6">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Suscipit aspernatur cumque nam blanditiis nisi illum officiis
                      rem iste, doloremque quae ducimus consectetur aperiam iure
                      distinctio optio at quisquam nesciunt sint. Lorem ipsum dolor
                      sit amet consectetur, adipisicing elit.
                    </p>
    
                    <div className="my-6 text-md lg:text-2xl font-semibold flex justify-around">
                      <p>Tickets: {festival.ticketAvailable}</p>
                      <p>Price: {festival.basicPrice} €</p>
                    </div>
    
                    <p className="font-bold text-md lg:text-2xl text-center">
                      Starts:{" "}
                      {new Date(festival.dateStart).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFestival(festival);
                        navigate("/festival_details");
                      }}
                      className="w-full bg-green-500 text-white text-2xl lg:text-3xl py-2 lg:py-4 mt-4 rounded-full transition-all duration-150 hover:bg-green-600"
                    >
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
      
      
    
 


export default Festivals;