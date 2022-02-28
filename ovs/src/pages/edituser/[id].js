import React, { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";

const Private = "c99a65d5-9a38-4a6d-a72d-297e2981a22b";

function Edit() {
  const { id } = useParams();
  const [User, setUser] = useState(null);
  const ApiUrl = "http://localhost:3030/api/user";
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const role = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [Cookies, setCookies, removeCookies] = useCookies("username", "chat");
  const idchat = Cookies.idchat;

  // RESPONSE
  const [UserResult, setUserResult] = useState(null);
  const [UserErr, setUserErr] = useState(null);
  const utilisateur = false;
  const admin = true;
  // END RESPONSE

  // GET
  useEffect(() => {
    axios.get(`${ApiUrl}/${id}`).then((response) => {
      setUser(response.data);
    });
  }, []);
  // END GET

  // UPDATE
  async function updateUser() {

    const UserData = {
      lastname: lastname.current.value,
      firstname: firstname.current.value,
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
      admin: role.current,
    };

    try {
      if (!firstname.current.value) {
        UserData.firstname = User.firstname;
      }
      if (!lastname.current.value) {
        UserData.lastname = User.lastname;
      }
      if (!firstname.current.value) {
        UserData.firstname = User.firstname;
      }
      if (!username.current.value) {
        UserData.username = User.username;
      }
      if (!email.current.value) {
        UserData.email = User.email;
      }
      if (!role.current) {
        UserData.admin = User.admin
      }
      if (!password.current.value) {
        throw new Error("Le mot de passe doit être précisé");
      }
      const res = await axios.put(`${ApiUrl}/${id}`, UserData, {
        headers: {
          "auth-token": Cookies.token,
        },
      });
      const configChat = {
        method: "PATCH",
        url: `https://api.chatengine.io/users/${idchat}`,
        headers: {
          "PRIVATE-KEY": Private,
        },
        data: {
          username: UserData.username,
          secret: UserData.password,
        },
      };
      const chatRes = await axios(configChat);
      setCookies("username", UserData.username);
      setCookies("chat", UserData.password);
      const result = res.data.message;
      setUserResult(result);
    } catch (err) {
      setUserErr(err.response?.data.message || err.message);
    }
  }
  // END UPDATE

  // DELETE
  async function Delete() {
    const config = {
      method: "DELETE",
      url: `https://api.chatengine.io/users/${idchat}`,
      headers: {
        "PRIVATE-KEY": Private,
      },
    };

    try {
      const res = await axios.delete(`${ApiUrl}/${id}`, {
        headers: {
          "auth-token": Cookies.token,
        },
      });
      await axios(config);
      const result = res.data.message;
      console.log(result);
      removeCookies("token");
      removeCookies("role");
      removeCookies("id");
      removeCookies("username");
      removeCookies("chat");
      removeCookies("idchat");
      setUserResult(result);
      setIsOpen(false);
    } catch (err) {
      setUserErr(err.response?.data.message || err.message);
    }
  }
  // END DELETE

  if (!User) return "No User !";

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12"></div>
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{backgroundImage: "URL(https://zupimages.net/up/22/05/lqve.jpg)"}}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">
                Modifier le compte {User.firstname} {User.lastname}
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
                          Supprimer le compte
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Êtes-vous sûr de vouloir supprimer ce compte ?
                            Toutes les données correspondantes seront
                            définitivement effacées.
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
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Prénom
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      ref={firstname}
                      placeholder={`${User.firstname}`}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Nom
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      ref={lastname}
                      placeholder={`${User.lastname}`}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Votre email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={email}
                    placeholder={`${User.email}`}
                  />
                </div>
                <div className="md:flex md:justify-between">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Votre pseudo
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      ref={username}
                      placeholder={`${User.username}`}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Mot de passe
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      ref={password}
                      placeholder="****"
                    />
                  </div>
                </div>
                <div className="md:flex md:justify-between">
                  {Cookies.role === "Skywalker" && (
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Rôle
                      </label>
                      <select
                        className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        ref={role}
                        defaultValue={`${User.admin}`}
                      >
                        <option value={utilisateur}>Utilisateur</option>
                        <option value={admin}>Admin</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <button
                    className="bg-blue-600 py-2 px-10 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
                    onClick={updateUser}
                    type="button"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 py-2 px-2 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide ml-7"
                  >
                    Supprimer
                  </button>
                </div>
                {UserResult && (
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
                    <span className="block sm:inline">{UserResult}</span>
                  </div>
                )}
                {UserErr && (
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
                    <span className="block sm:inline">{UserErr}</span>
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
