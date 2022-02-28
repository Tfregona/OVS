import React, { useState, useEffect } from "react";
import axios from "axios";
import SportCard from "../components/card/Sport";
import Spinner from "../components/loading/Spinner";
import { AiOutlineArrowUp } from "react-icons/ai";

function Sports() {
  const ApiUrl = "http://localhost:3030/api/sports";
  const [items, setItems] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

   var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
  
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

  // GET
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(ApiUrl);
      setItems(result.data);
      setIsLoad(false);
    };
    fetchItems();
  }, []);
  // END GET
  return (
    <div>
      {isLoad ? (
        <Spinner />
      ) : (
        <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <SportCard item={item} />
            </React.Fragment>
          ))}
        <button onClick={topFunction} id="myBtn" title="Go to top " className="rounded-full shadow-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-cyan-100 h-10 w-10 animate-bounce fixed bottom-0 right-10">
        <p className="ml-3 flex flex-center "><AiOutlineArrowUp/></p>
        </button>

        </div>
      )}
    </div>
  );
}

export default Sports;
