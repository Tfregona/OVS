import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from "axios";
import Spinner from "../loading/Spinner";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";

function Sports() {
  const ApiUrl = "http://localhost:3030/api/sports";
  const [isLoad, setIsLoad] = useState(true);
  const [Cookies] = useCookies(["token"]);
  // DIALOG POST
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // END DIALOG POST

  // DIALOG DELETE
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function closeModalDelete() {
    setIsOpenDelete(false);
  }
  // END DIALOG DELETE

  // RESPONSES
  const [postResult, setPostResult] = useState(null);
  const [postErr, setPostErr] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);
  const [deleteErr, setDeleteErr] = useState(null);
  // END RESPONSES

  // GET
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(ApiUrl);
      setItems(result.data);
      setIsLoad(false);
    };
    fetchItems();
  }, []);
  // END GET

  // POST FORM
  const title = useRef(null);
  const description = useRef(null);
  const url_wiki = useRef(null);
  const url_image = useRef(null);

  async function postData() {
    const postData = {
      title: title.current.value,
      description: description.current.value,
      url_image: url_image.current.value,
      url_wiki: url_wiki.current.value,
    };

    try {
      const res = await axios.post(ApiUrl, postData, {
        headers: {
          "auth-token": Cookies.token }
        });
      const result = res.data.message;
      setPostResult(result);
    } catch (err) {
      setPostErr(err.response?.data.message);
    }
  }
  // END POST FORM

  // DELETE
  async function deleteDataById(_id) {
    const id = _id;
    if (id) {
      try {
        const res = await axios.delete(`${ApiUrl}/${id}`, {
          headers : {
            "auth-token": Cookies.token
          }
        });
        const result = res.data.message;
        setDeleteResult(result);
        setIsOpenDelete(true);
      } catch (err) {
        setDeleteErr(err.response?.data.message);
      }
    }
  }
  // END DELETE

  return (
    <div>
      {isLoad ? (
        <Spinner />
      ) : (
        <div>
          {/* MODAL POST */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
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

                {/* This element is to trick the browser into centering the modal contents. */}
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
                      Créer un sport
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <div className="card-body">
                          <div className="form-group">
                            <div className="mb-4">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Titre
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                ref={title}
                                placeholder="Titre"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Description
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                ref={description}
                                placeholder="Description"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Image
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                ref={url_image}
                                placeholder="Image"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block mb-2 text-sm font-bold text-gray-700">
                                Wiki
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                ref={url_wiki}
                                placeholder="Wiki"
                              />
                            </div>
                          </div>
                          {postResult && (
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
                              <span className="block sm:inline">
                                {postResult}
                              </span>
                            </div>
                          )}
                          {postErr && (
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
                              <span className="block sm:inline">{postErr}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      <button
                        type="button"
                        className="m-auto ml-0 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-500 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="m-auto mr-0 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-500 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={postData}
                      >
                        Post Data
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
          {/* END MODAL POST */}
          {/* MODAL DELETE */}
          <Transition appear show={isOpenDelete} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModalDelete}
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

                {/* This element is to trick the browser into centering the modal contents. */}
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
                      Suppression
                    </Dialog.Title>
                    <div className="mt-2">
                      {deleteResult && (
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
                          <span className="block sm:inline">
                            {deleteResult}
                          </span>
                        </div>
                      )}
                      {deleteErr && (
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
                          <span className="block sm:inline">{deleteErr}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="ml-auto inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => closeModalDelete()}
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
          {/* END MODAL DELETE */}
          <div className="bg-gray-200">
            <div className="flex items-center justify-center mb-2">
              <p className="px-2 text-gray-600 font-bold border-b-2 border-black">
                Tous les sports
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={openModal}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Créer un sport
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Titre</th>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-center">Wiki</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {items.map((item) => (
                  <React.Fragment key={item._id}>
                    <tr className="border-b border-gray-200 bg-gray-100 hover:bg-gray-200">
                      <td className="py-3 px-6 text-left break-words">
                        <div className="flex items-center">
                          <p className="font-medium">{item.title}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div></div>
                          <a
                            href={item.url_image}
                            target="_blank"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          >
                            Voir
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-purple-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {item.url_wiki}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <Link
                            to={`/editsport/${item._id}`}
                            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </Link>
                          <div
                            onClick={() => deleteDataById(item._id)}
                            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sports;
