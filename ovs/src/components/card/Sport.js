import React from "react";

const SportCard = ({ item }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative border-b-2 border-blue-700">
      <img className="w-full" src={item.url_image} alt="Sport illustration" />
      <div className="w-full px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="text-black-700 text-base">
          {item.description}
          <br />
          <a href={item.url_wiki} className="text-blue-500">Lire la suite...</a>
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Sport
        </span>
        <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Duo
        </span>
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Equipe
        </span>
        <span className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Partage
        </span>
        <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #Santé
        </span>
      </div>
    </div>
  );
};

export default SportCard;
