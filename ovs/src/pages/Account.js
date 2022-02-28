import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Tab, Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import avatarF from "../images/avatarF.gif";
import avatarH from "../images/avatarH.gif";
import avatarA from "../images/avatarA.gif";
import AddImage from "../components/auth/AddImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Account() {
  const [User, setUser] = useState();
  const [postsAuthor, setPostsAuthor] = useState([]);
  const [postsAttendee, setPostsAttendee] = useState([]);
  const [Cookies] = useCookies(["token", "role"]);
  const [UserAge, setAge] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [deleteResult, setDeleteResult] = useState(null);

  // Edit image
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Get User Data
  const configUser = {
    method: "GET",
    url: "http://localhost:3030/api/user/my/page",
    headers: {
      "auth-token": Cookies.token,
    },
  };
  const configPostsAuthor = {
    method: "GET",
    url: "http://localhost:3030/api/posts/author/account",
    headers: {
      "auth-token": Cookies.token,
    },
  };
  const configPostsAttendee = {
    method: "GET",
    url: "http://localhost:3030/api/posts/attendee/account",
    headers: {
      "auth-token": Cookies.token,
    },
  };
  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios(configUser);
      setUser(result.data);
      let date = new Date(result.data.age);
      setAge(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    };
    const fetchPostsAuthor = async () => {
      const result = await axios(configPostsAuthor);
      setPostsAuthor(result.data);
      setIsLoad(false);
    };
    const fetchPostsAttendee = async () => {
      const result = await axios(configPostsAttendee);
      setPostsAttendee(result.data);
      setIsLoad(false);
    };
    fetchUser();
    fetchPostsAuthor();
    fetchPostsAttendee();
  }, []);
  // End Get User Data

  // DELETE
  async function deleteDataById(_id) {
    const id = _id;

    if (id) {
      try {
        const res = await axios.delete(
          `http://localhost:3030/api/posts/${id}`,
          {
            headers: {
              "auth-token": Cookies.token,
            },
          }
        );
        const result = res.data.mesage;
        setDeleteResult(result);
      } catch (err) {
        console.log("error api");
      }
    }
  }
  // END DELETE

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0 mx-auto">
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
                  onClick={closeModal}
                >
                  Changez votre avatar
                </Dialog.Title>
                <AddImage />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {User ? (
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Mes infos
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Mes annonces
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Mes événements
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <div className="flex flex-col-2 px-10 mt-8 text-lg max-w-prose ml-auto mr-auto">
                <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 mx-auto mb-4 max-w-xs col-span-2 md:col-span-1">
                  {User.avatar ? (
                    <img
                      className="mb-3 w-100 h-100 rounded-full shadow-lg mx-auto cursor-pointer hover:opacity-50"
                      src={`${User.avatar.image}`}
                      onClick={() => openModal()}
                      alt="product designer"
                    />
                  ) : (
                    <img
                      className="mb-3 w-100 h-100 rounded-full shadow-lg mx-auto cursor-pointer hover:opacity-50"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      onClick={() => openModal()}
                      alt="product designer"
                    />
                  )}

                  <h1 className="text-lg text-black-400">
                    {User.firstname} {User.lastname}
                  </h1>

                  <h3 className="text-sm text-black-400 ">
                    {User.admin === false ? "User" : "Admin"} - {User.username}
                  </h3>

                  <div className="text-xs grid justify-items-center text-black-400 mt-4">
                    {User.sexe === "Homme" ? (
                      <div className="flex items-center">
                        <img
                          src={avatarH}
                          style={{ width: "2.5rem", display: "block" }}
                          alt="Genre"
                        />
                        <p>Homme</p>
                      </div>
                    ) : User.sexe === "Femme" ? (
                      <div className="flex items-center">
                        <img
                          src={avatarF}
                          style={{ width: "2.5rem", display: "block" }}
                          alt="Genre"
                        />
                        <p>Femme</p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <img
                          src={avatarA}
                          style={{ width: "2.5rem", display: "block" }}
                          alt="Genre"
                        />
                        <p>Autre</p>
                      </div>
                    )}
                    <br />
                    <div className="flex items-center">
                      <p>{UserAge}</p>
                    </div>
                  </div>
                  <br />
                  <h3 className="text-sm text-black-400 "> {User.email} </h3>
                  <br />
                  <div className="flex">
                    <Link
                      to={`/edituser/${User._id}`}
                      className="bg-indigo-600 m-auto p-2 rounded-3xl text-gray-100 font-semibold tracking-wide"
                    >
                      Modifier
                    </Link>
                    {Cookies.role === "Skywalker" && (
                      <Link
                        to={`/admin`}
                        className="bg-yellow-500 m-auto p-2 rounded-3xl text-gray-100 font-semibold tracking-wide"
                      >
                        Page admin
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {isLoad === false && (
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Annonces
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Places
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Voir</span>
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Delete</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {postsAuthor.map((item) => (
                              <tr key={item._id}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span>{item.title.substring(0, 15)} ...</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                  {item.places}
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link
                                    to={`/post/${item._id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Voir
                                  </Link>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link
                                    to={`/editpost/${item._id}`}
                                    className="text-yellow-500 hover:text-indigo-900"
                                  >
                                    Edit
                                  </Link>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div
                                    onClick={() => deleteDataById(item._id)}
                                    className="text-red-600 hover:cursor-pointer hover:text-indigo-900"
                                  >
                                    Delete
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isLoad === false && (
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Annonces
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Places
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Inscrits
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Voir</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {postsAttendee.map((item) => (
                              <tr key={item._id}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span>{item.title.substring(0, 15)} ...</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                  {item.places}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                  {item.attendees.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link
                                    to={`/post/${item._id}`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Voir
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        "Not allowed"
      )}
    </div>
  );
}

export default Account;
