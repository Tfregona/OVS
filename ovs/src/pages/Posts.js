/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/card/Post";
import backImage from "../images/back/back1.jpg";


function Posts() {
  const ApiUrl = "http://localhost:3030/api/posts";
  const [items, setItems] = useState([]);

  // GET
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(ApiUrl);
      setItems(result.data);
    };
    fetchItems();
  }, []);
  // END GET

  // Filter search
  const [queryLocalisation, setQueryLocalisation] = useState("");
  const onChangeLocalisation = (e) => {
    setQueryLocalisation(`localisation=${e}`);
  };

  const [querySport, setQuerySport] = useState("");
  const onChangeSport = (e) => {
    setQuerySport(`sport=${e}`);
  };

  const search = async () => {
    try {
      if (queryLocalisation != "" && querySport != "") {
        const result = await axios(
          `${ApiUrl}?${queryLocalisation}&${querySport}`
        );
        setItems(result.data);
      } else {
        const result = await axios(
          `${ApiUrl}?${queryLocalisation}${querySport}`
        );
        setItems(result.data);
      }
    } catch (err) {}
  };
  // End filter search

  return (
    <div>
      <div
        className="grid grid-cols-1 pt-[15rem] pb-5"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-items justify-center border-solid border-2 border-gray-400 bg-gray-50 mt-10 mx-auto py-2 rounded-full overflow-hidden">
          {/* Place Input */}
          <div>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={(e) => onChangeLocalisation(e.target.value)}
                className="block p-2 pl-10 w-full text-blue-500 placeholder:text-blue-300 placeholder:font-normal font-semibold outline-none border-r border-r-indigo-500/50 bg-gray-50"
                placeholder="Renseigner la ville"
              />
            </div>
          </div>
          {/* End Place Inpout */}

          {/* Sport Input */}
          <div>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={(e) => onChangeSport(e.target.value)}
                className="block p-2 pl-10 w-full text-blue-500 placeholder:text-blue-300 placeholder:font-normal font-semibold outline-none border-r border-r-indigo-500/50 bg-gray-50"
                placeholder="Renseigner le sport"
              />
            </div>
          </div>
          {/* End Sport Inpout */}

          {/* Submit */}
          <div>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="block p-2 pl-10 w-full text-blue-500">
                <button className="font-semibold" onClick={search}>
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          {/* End Submit */}

        </div>
      </div>
      {/* END Search Bar */}

      {/* Map Posts */}
      <div className="p-10 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {items.map((item) => (
          <React.Fragment key={item._id}>
            <PostCard item={item} />
          </React.Fragment>
        ))}
      </div>
      {/* End Map Posts */}
    </div>
  );
}

export default Posts;
