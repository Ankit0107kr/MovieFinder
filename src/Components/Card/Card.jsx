import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Card = ({ movie }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) {
    return (
      <div className="relative mx-auto mb-14 h-[28rem] w-[18rem] animate-pulse rounded-3xl bg-gray-900 pb-2 shadow-xl shadow-black/5">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p><Skeleton height={280} duration={2} /></p>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="group mx-auto mb-14 flex h-[28rem] w-[18rem] flex-col justify-end rounded-xl bg-cover bg-center pb-2 font-semibold text-white outline-double outline-[.6rem] outline-stone-400 transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:outline-offset-4"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
        }}
      >
        
        <h1 className="mb-2 ml-1 hidden text-sm font-light md:group-hover:block">
          {movie.title}
        </h1>
        <h1 className="mb-2 ml-1 hidden text-sm font-light md:group-hover:block">
          {movie.release_date}
        </h1>
        
      </div>
    </Link>
  );
};

export default Card;
