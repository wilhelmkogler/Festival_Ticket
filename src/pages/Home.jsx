import { useNavigate } from "react-router-dom";

function Home({ darkMode }) {
  const navigate = useNavigate();

  const formlocations = [
    "Ibiza",
    "Berlin",
    "Budapest",
    "Barcelona",
    "Amsterdam",
    "Prague",
  ];

  const toplocations = [
    { city: "Ibiza", image: "img/cities/barcelona.jpg" },
    { city: "Lisbon", image: "img/cities/lisbon.jpg" },
    { city: "Amsterdam", image: "img/cities/athens.jpg" },
  ];

  return (
    <div
      className={`max-w-7xl lg:mx-auto py-6 my-12 lg:mt-32 p-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="h-full lg:h-[70vh] flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="w-full lg:w-[60%] flex justify-center items-center">
          <div className="w-full flex flex-col items-center gap-8">
            <h1 className="hidden lg:block text-4xl lg:text-6xl font-bold">
              Welcome to FestivalApp
            </h1>

            <div className="flex flex-col gap-4">
              <h1 className="block lg:hidden text-4xl lg:text-6xl font-bold">
                Welcome to
              </h1>

              <h1 className="block lg:hidden text-4xl lg:text-6xl font-bold">
                FestivalApp
              </h1>
            </div>

            <p className="text-sm lg:text-2xl text-center">
              The ultimate celebration of music, lights, and life <br />
              join us this summer and feel the vibe!
            </p>
            <button
              className=" px-8 py-3 bg-lila text-white text-lg font-semibold rounded-full hover:scale-110 transition"
              onClick={() => navigate("/festivals")}
            >
              Get Your Ticket
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[40%]">
          <div className="flex flex-col lg:flex-row gap-0 items-center">
            {/* Képes kártyák bal oldalon */}
            <div className="flex flex-col gap-6 w-full">
              {toplocations.map((loc, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => navigate("/festivals")}
                >
                  <img
                    src={loc.image}
                    alt={loc.city}
                    className="w-full h-24 lg:h-32 object-cover group-hover:blur-sm transition duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="text-white text-md lg:text-xl font-bold bg-lila bg-opacity-50 px-4 py-2 rounded-lg">
                      {loc.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Vertikális felirat jobb oldalon */}
            <div className="hidden lg:flex justify-center w-[20%]">
              <span className="text-3xl font-semibold transform rotate-90 whitespace-nowrap tracking-widest">
                TOP LOCATIONS
              </span>
            </div>

            <div className="mt-8 flex lg:hidden justify-center ">
              <span className="text-2xl font-semibold transform whitespace-nowrap tracking-widest">
                TOP LOCATIONS
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className=" mt-20 py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Stay Informed</h2>
          <p className="mb-8 text-xl">
            Subscribe to get notified when a new festival is announced in your
            favorite location.
          </p>
          <form className="space-y-6">
            <select
              className="w-full p-3 rounded-lg border text-black"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {formlocations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg border text-black"
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border text-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-lila text-white py-3 rounded-lg font-semibold hover:bg-vip transition"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
