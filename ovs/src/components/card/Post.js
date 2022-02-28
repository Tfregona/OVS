import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ item }) => {
  let date = new Date(item.date);
  let dateMDY = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div className=" w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage: `url(${item.sport.url_image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        title="Mountain"
      ></div>
      <div className="md:w-10/12 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-blue-600 font-bold text-xl mb-2">
            {item.title}
          </div>
          <div className="text-gray-900 text-xl mb-2">
            Sport : {item.sport.title}
          </div>
          <p className="text-gray-700 text-base">
            Description : {item.description.substring(0, 100)} ...
          </p>
          <p className="text-gray-700 text-base">
            Localisation : {item.localisation}
          </p>
          <p className="text-gray-700 text-base">
            Niveau : {item.level}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Link to={`/userpage/${item.author._id}`}>
              {item.author.avatar ? (
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={item.author.avatar.image}
                  alt="Avatar of writer"
                />
              ) : (
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="data:image/png;base64,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"
                  alt="Avatar of writer"
                />
              )}
            </Link>
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {item.author.firstname} {item.author.lastname}
              </p>
              <p className="text-gray-600">{dateMDY}</p>
            </div>
          </div>
          <div className="m-auto md:m-0 md:my-auto md:flex md:justify-end">
            <Link
              to={`/post/${item._id}`}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Voir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PostCard;
