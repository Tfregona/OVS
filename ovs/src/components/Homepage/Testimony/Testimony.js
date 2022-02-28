import { React, useState, useEffect } from "react";
import { TestimonyData } from "./Testimony-data";

const Testimony = () => {
  const [currentTestimony, setCurrentTestimony] = useState(0);
  const testimonyLength = TestimonyData.length;

  const autoSlide = true;
  let testimonyInterval;
  let intervalTime = 10000;

  const nextTestimony = () => {
    setCurrentTestimony(
      currentTestimony === testimonyLength - 1 ? 0 : currentTestimony + 1
    );
  };

  function auto() {
    testimonyInterval = setInterval(nextTestimony, intervalTime);
  }

  useEffect(() => {
    setCurrentTestimony(0);
  }, []);

  useEffect(() => {
    if (autoSlide) {
      auto();
      return () => clearInterval(testimonyInterval);
    }
  }, [currentTestimony]);

  return (
    <div className="py-4 lg:px-10 Testimony">
      {TestimonyData.map((testimony, index) => {
        return (
          <div
            className={
              index === currentTestimony
                ? "opacity-100 transition-all duration-2000 ease-in-out"
                : "opacity-0 h-0"
            }
            key={index}
          >
            {index === currentTestimony && (
              <div className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 overflow-hidden shadow-lg rounded-lg">
                <img
                  src={testimony.avatar}
                  alt="avatar of the profil"
                  className="m-4 shadow-2xl relative w-28 h-28 m-auto float-left rounded-full lg:m-4 lg:w-32 lg:h-32 lg:m-auto lg:float-left "
                />
                <div className="p-4">
                  <div className="text-3xl mb-2">
                    <p className="float-right text-lg mr-4">
                      {testimony.lieu}
                    </p>
                    {testimony.title}
                  </div>
                  <div className="text-left font-semibold text-2xl font-normal">
                    "{testimony.desc}" -{" "}
                    <p className="font-semibold text-blue-200 text-lg">@{testimony.pseudo}</p>
                  </div>
                  <div className="italic text-sm text-right">
                    Publié le: {testimony.date}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Testimony;
