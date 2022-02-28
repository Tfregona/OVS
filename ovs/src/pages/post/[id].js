import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Spinner from "../../components/loading/Spinner";
import Kitsurf from "./KitSurf.mp4"

function Post() {
  const { id } = useParams();
  const [Post, setPost] = useState(null);
  const ApiUrl = "http://localhost:3030/api/posts";
  const [Cookies] = useCookies(["token", "id"]);
  const [alreadyInscribed, setAlreadyInscribed] = useState(false);

  // GET
  useEffect(() => {
    axios.get(`${ApiUrl}/${id}`).then((response) => {
      setPost(response.data);
      const attendees = response.data.attendees;
      const found = attendees.find((element) => element._id === Cookies.id);
      if (found) setAlreadyInscribed(true);
    });
  }, []);
  // END GET

  // Inscription
  const [inscriptionRes, setInscriptionRes] = useState();
  const [inscriptionErr, setInscriptionErr] = useState();

  const configInscription = {
    method: "PUT",
    url: `${ApiUrl}/inscription/${id}`,
    headers: {
      "auth-token": Cookies.token,
    },
  };

  const inscription = async () => {
    try {
      const res = await axios(configInscription);
      setInscriptionRes(res.data.message);
    } catch (err) {
      setInscriptionErr(err.response?.data.message);
    }
  };
  // Inscription

  // Desinscription
  const configDesInscription = {
    method: "PUT",
    url: `${ApiUrl}/desinscription/${id}`,
    headers: {
      "auth-token": Cookies.token,
    },
  };

  const desInscription = async () => {
    try {
      const res = await axios(configDesInscription);
      setInscriptionRes(res.data.message);
    } catch (err) {
      setInscriptionErr(err.response?.data.message);
    }
  };
  // Desinscription

  if (!Post) return <Spinner />;

  return (

    <div>
      
    <div className="static flex flex-wrap items-center justify-center ">
      {/* <!-- Card left --> */}
      <div className="grid grid-cols-1 min-w-sm sm:max-w-md md:grid-cols-2 my-4 md:w-6/12 bg-white rounded-lg overflow-hidden border-2 border-gray-500">
        <div>
          <div className="flex font-bold ml-1 justify-center"> {Post.title} </div>
          <img
            alt="Sport"
            src={Post.sport.url_image}
            className="w-full h-44 "
          />
          <div className="grid grid-cols-1 p-2">
            <Link
              to={`/userpage/${Post.author._id}`}
              className="font-semibold mt-2"
            >
              Auteur :
              <span className="font-normal p-1 ml-1 rounded hover:underline underline-offset-4">
                {Post.author.firstname} {Post.author.lastname}
              </span>
            </Link>
            <p className="font-semibold mt-2">
              Sport : <span className="font-normal"> {Post.sport.title}</span>
            </p>
            <p className=" font-semibold mt-2">
              Localisation :
              <span className="font-normal"> {Post.localisation}</span>
            </p>
            <p className=" font-semibold mt-2">
              Niveau :
              <span className="font-normal"> {Post.level}</span>
            </p>
            <p className="text-center font-semibold bg-red-100 px-8 rounded mt-2">
              Places restantes :
              <span className="font-normal"> {Post.places}</span>
            </p>
            <p className="font-semibold mt-2">Description :</p>
            <p className="text-justify px-1 font-normal bg-gray-100 min-h-[8rem] break-words">
              {Post.description}
            </p>
          </div>
        </div>
        {/*  <!-- Card left End --> */}

        {/*  <!-- Card right --> */}
        <div className="md:bg-gray-50 md:mt-5">
          <div className="flex mt-2">
            {Cookies.token ? (
              <>
                {alreadyInscribed ? (
                  <button
                    className="text-gray-100 m-auto font-semibold bg-blue-600 hover:bg-blue-700 py-1.5 px-5 rounded-full"
                    onClick={() => desInscription()}
                  >
                    Se désinscrire
                  </button>
                ) : (
                  <button
                    className="text-gray-100 m-auto font-semibold bg-blue-600 hover:bg-blue-700 py-1.5 px-5 rounded-full"
                    onClick={() => inscription()}
                  >
                    S'inscrire
                  </button>
                )}
              </>
            ) : (
              <div className="ml-auto">
                <p className="text-sm text-pink-600 flex items-center">
                  <svg
                    className="fill-current text-pink-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  <Link to="/account">Connectez-vous</Link>
                </p>
                <div className=" flex items-center justify-center">
                  <button className="text-gray-100 bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                    S'inscrire
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            {inscriptionRes && (
              <div
                className="bg-blue-100 border flex border-blue-500 text-blue-700 px-2 my-auto rounded relative mr-1"
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
                <span className="block sm:inline">{inscriptionRes}</span>
              </div>
            )}
            {inscriptionErr && (
              <div
                className="bg-red-100 border flex border-red-400 text-red-700 px-2 my-auto rounded relative mr-1"
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
                <span className="block sm:inline">{inscriptionErr}</span>
              </div>
            )}
          </div>
          <div className="mx-2">
            <p className="text-center font-semibold bg-blue-200 px-8 rounded-t">
              Participants :
            </p>
            {Post.attendees[0] ? (
              <div className="divide-y divide-blue-100">
                {Post.attendees.map((item) => (
                  <React.Fragment key={item._id}>
                    <p
                      to={`/userpage/${item._id}`}
                      className="text-center"
                    >
                      <Link to={`/userpage/${item._id}`}>
                       - {item.firstname} {item.lastname}
                      </Link>
                    </p>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p className="font-semibold bg-yellow-100 px-8">
                Il n'y a pas encore de participants.
              </p>
            )}
          </div>
        </div>
        {/*  <!-- Card right end --> */}
      </div>
      <video className='hidden lg:block lg:-z-10 lg:h-100% lg:w-100% lg:absolute lg:opacity-60' autoPlay loop muted>
    <source src={Kitsurf} type='video/mp4' alt="Kit surf video"/>
</video>
    </div>
    </div>
  );
}

export default Post;
