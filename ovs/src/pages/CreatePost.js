import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import Weather from "../components/Weather/Weather";

function Createpost() {
  const ApiUrl = "http://localhost:3030/api/posts";
  const ApiUrlSports = "http://localhost:3030/api/sports";
  const [CreatePostRes, setCreatePostRes] = useState();
  const [CreatePostErr, setCreatePostErr] = useState();
  const [startSate, setstartSate] = useState(new Date());
  const [Cookies] = useCookies(["token"]);
  const title = useRef();
  const description = useRef();
  const places = useRef();
  const level = useRef();
  const localisation = useRef();
  const date = useRef();
  const sport = useRef();

  // GET SPORTS
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(ApiUrlSports);
      setItems(result.data);
    };
    fetchItems();
  }, []);
  // END GET SPORTS

  const [imageSport, setImage] = useState(
    "https://zupimages.net/up/22/04/7bjl.jpg"
  );
  const setImageApi = async (id) => {
    const result = await axios(`${ApiUrlSports}/${id}`);
    setImage(result.data.url_image);
  };

  // POST
  async function postform() {
    const userData = {
      title: title.current.value,
      description: description.current.value,
      places: places.current.value,
      level: level.current.value,
      localisation: localisation.current.value,
      date: startSate,
      sport: sport.current.value,
    };

    try {
      const res = await axios.post(ApiUrl, userData, {
        method: "post",
        headers: {
          "auth-token": Cookies.token,
        },
      });
      const result = res.data.message;
      setCreatePostRes(result);
    } catch (err) {
      if (err.response.status === 400) {
        setCreatePostErr(err);
      }
    }
  }
  // END POST

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div>
      <Weather />
            </div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Créer une annonce</h3>
              <form className="px-8 pt-6 pb-8 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Titre
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={title}
                      type="text"
                      placeholder="Titre de l'annonce"
                      required={true}
                    />
                  </div>

                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Localisation
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={localisation}
                      type="text"
                      placeholder="Localisation"
                      required={true}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-8 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Description{" "}
                      <span className="font-light">
                        (Précisez bien le sport correspondant pour faciliter la
                        visibilité de votre annonce)
                      </span>
                    </label>
                    <textarea
                      className="w-full px-3 py-2 text-sm leading-tight resize-none text-gray-700 border rounded shadow focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="text"
                      ref={description}
                      placeholder="Description"
                      required={true}
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Niveau
                    </label>
                    <select
                      ref={level}
                      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Débutant"> Débutant </option>
                      <option value="Intermediaire"> Intermediaire </option>
                      <option value="Pro"> Pro </option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Selectionnez le sport
                    </label>
                    <select
                      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      ref={sport}
                      required="required"
                      onChange={() => setImageApi(sport.current.value)}
                    >
                      {items.map((item) => (
                        <React.Fragment key={item._id}>
                          <option value={item._id} name={item.url_image}>
                            {item.title}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Date de rendez-vous
                    </label>
                    <DatePicker
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      selected={startSate}
                      onChange={(date) => setstartSate(date)}
                      dateFormat="dd/MM/yyyy"
                      ref={date}
                      required="required"
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Places
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={places}
                      type="number"
                      placeholder="2"
                      required="required"
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={postform}
                  >
                    Valider l'annonce
                  </button>

                  {CreatePostRes && (
                    <div
                      className="bg-blue-100 border mt-2 flex border-blue-500 text-blue-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="block sm:inline">{CreatePostRes}</span>
                    </div>
                  )}
                  {CreatePostErr && (
                    <div
                      className="bg-red-100 border mt-2 flex border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span className="block sm:inline">{CreatePostErr}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createpost;
