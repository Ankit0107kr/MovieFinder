import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-500">
        About MovieFinder 🎬
      </h1>

      <div className="max-w-4xl text-lg text-gray-300 leading-8 text-center">
        <p className="mb-6">
          Welcome to <span className="text-indigo-400 font-semibold">MovieFinder</span>, your go-to platform to explore and discover the world of movies.
          Whether you're into thrilling action, heartwarming romance, mind-bending sci-fi, or laugh-out-loud comedy, MovieFinder helps you find it all with ease.
        </p>

        <p className="mb-6">
          Our platform leverages data from the <span className="text-yellow-400 font-semibold">TMDB API</span> to bring you up-to-date information on the most
          popular, trending, and searched movies. From posters to ratings and release dates to overviews — we’ve got everything you need to pick your next watch.
        </p>

        <p className="mb-6">
          With features like live search, genre-based filtering, and a sleek user interface, MovieFinder makes movie browsing fun and effortless.
        </p>

        <p className="mb-6">
          Built using <span className="text-blue-400 font-semibold">React</span> and styled with <span className="text-pink-400 font-semibold">Tailwind CSS</span>,
          our mission is to offer a seamless and responsive experience across all devices.
        </p>

        <p className="mb-6">
          Thanks for visiting MovieFinder. We hope it becomes your favorite place to decide what to watch next. 🍿
        </p>

        <p className="mt-8 text-indigo-400">Made with ❤️ by Ankit Kumar</p>
      </div>
    </div>
  );
};

export default AboutUs;
