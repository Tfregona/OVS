import React, { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";
function Edit() {
  const { id } = useParams();
  const [Sport, setSport] = useState(null);
  const ApiUrl = "http://localhost:3030/api/sports";
  const title = useRef();
  const description = useRef();
  const url_image = useRef();
  const url_wiki = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [Cookies] = useCookies(["token"]);

  // RESPONSE
  const [SportResult, setSportResult] = useState(null);
  const [SportErr, setSportErr] = useState();
  // END RESPONSE

  // GET
  useEffect(() => {
    axios.get(`${ApiUrl}/${id}`).then((response) => {
      setSport(response.data);
    });
  }, []);
  // END GET

  // UPDATE
  async function updateSport() {
    const SportData = {
      title: title.current.value,
      description: description.current.value,
      url_image: url_image.current.value,
      url_wiki: url_wiki.current.value,
    };

    try {
      if (!title.current.value) {
        SportData.title = Sport.title;
      }
      if (!description.current.value) {
        SportData.description = Sport.description;
      }
      if (!url_image.current.value) {
        SportData.url_image = Sport.url_image;
      }
      if (!url_wiki.current.value) {
        SportData.url_wiki = Sport.url_wiki;
      }
      const res = await axios.put(`${ApiUrl}/${id}`, SportData, {
        headers: {
          "auth-token": Cookies.token,
        },
      });
      const result = res.data.message;
      setSportResult(result);
    } catch (err) {
      setSportErr(err.response?.data.message || err.message);
    }
  }
  // END UPDATE

  // DELETE
  async function Delete() {
    try {
      const res = await axios.delete(`${ApiUrl}/${id}`, {
        headers: {
          "auth-token": Cookies.token
        }
      });
      const result = res.data.message;
      setSportResult(result);
      setIsOpen(false);
    } catch (err) {
      setSportErr(err.response?.data.message || err.message);
    }
  }
  // END DELETE

  if (!Sport) return "No Sport !";

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12"></div>
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundColor: "black" }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">
                Modifier le compte {Sport.title}
              </h3>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed z-10 inset-0 overflow-y-auto"
                  onClose={() => setIsOpen(false)}
                >
                  <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Supprimer le sport
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Êtes-vous sûr de vouloir supprimer ce sport ? Toutes
                            les données correspondantes seront définitivement
                            effacées.
                          </p>
                        </div>
                        <div className="flex mt-4">
                          <button
                            type="button"
                            className="bg-red-600 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 "
                            onClick={() => Delete()}
                          >
                            Confirmer
                          </button>
                          <button
                            type="button"
                            className="ml-auto inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => setIsOpen(false)}
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Titre
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={title}
                    placeholder={`${Sport.title}`}
                    defaultValue={`${Sport.title}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Image
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={url_image}
                    placeholder={`${Sport.url_image}`}
                    defaultValue={`${Sport.url_image}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Wiki
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={url_wiki}
                    placeholder={`${Sport.url_wiki}`}
                    defaultValue={`${Sport.url_wiki}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full resize-none h-[10rem] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={description}
                    placeholder={`${Sport.description}`}
                    defaultValue={`${Sport.description}`}
                  />
                </div>
                <div className="flex">
                  <button
                    className="bg-blue-600 py-2 px-10 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
                    onClick={updateSport}
                    type="button"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 py-2 px-2 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide ml-7"
                  >
                    Supprimer
                  </button>
                </div>
                {SportResult && (
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
                    <span className="block sm:inline">{SportResult}</span>
                  </div>
                )}
                {SportErr && (
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
                    <span className="block sm:inline">{SportErr}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
