import React, { useState } from "react";
import { cardsData } from "./Cards-data";

const Cards = () => {
  const [currentCards] = useState(0);
  const cardsLenght = cardsData.length;
  return (
    <div className="Cards grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {cardsData.map((cards, index) => {
        return (
          <div
            className={index === currentCards ? "cards current" : "cards"}
            key={index}
          >
            {index === cardsLenght
              ? 1
              : "cards" && (
                  <div className="max-w-sm text-white h-[30rem] rounded overflow-hidden shadow-lg hover:scale-105 lg:hover:scale-110 duration-300 hover:bg-gradient-to-r from-sky-500 to-indigo-600">
                    <img className="w-full" src={cards.image} alt="Logo Epitech" />
                    <div className="px-2 py-4">
                      <div className="font-bold text-xl mb-2 text-center">
                        {cards.title}
                      </div>
                      <p className="text-base">{cards.desc}</p>
                    </div>
                  </div>
                )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
