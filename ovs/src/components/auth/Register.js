import React, { useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleLogin from "react-google-login";
import { useCookies } from "react-cookie";

const Private = "c99a65d5-9a38-4a6d-a72d-297e2981a22b";

const Register = (props) => {
  const ApiUrl = "http://localhost:3030/api/user/register";
  const [startDate, setstartDate] = useState(new Date());
  const [Cookies, setCookies] = useCookies(["idchat"]);
  const [RegisterRes, setRegisterRes] = useState();
  const [RegisterErr, setRegisterErr] = useState();
  const [GoogleUser, setGoogleUser] = useState();
  const firstname = useRef();
  const password = useRef();
  const lastname = useRef();
  const username = useRef();
  const email = useRef();
  const sexe = useRef();
  const age = useRef();

  // REGISTER
  async function postform() {
    // OVS REGISTER
    const userData = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      username: username.current.value,
      email: email.current.value,
      sexe: sexe.current.value,
      age: startDate.toJSON(age),
      password: password.current.value,
    };

    // ChatEngine REGISTER
    const ChatData = {
      username: username.current.value,
      secret: password.current.value,
      email: email.current.value,
      first_name: firstname.current.value,
      last_name: lastname.current.value,
    };

    // OVS Api Config
    const config = {
      method: "POST",
      url: "https://api.chatengine.io/users/",
      headers: {
        "PRIVATE-KEY": Private,
      },
      data: ChatData,
    };
    try {
      const res = await axios.post(ApiUrl, userData, {
        headers: {
          "auth-token": Cookies.token,
        },
      }); // <= Post OVS
      const result = res.data.message;
      setRegisterRes(result);
      const chatRes = await axios(config); // <= Post ChatEngine
      const chatid = chatRes.data.id;
      setCookies("idchat", chatid);
    } catch (err) {
      setRegisterErr(err.response?.data.message);
    }
  }
  const responseGoogle = (response) => {
    setGoogleUser(response.profileObj);
  };
  // END REGISTER

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12"></div>
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage: "URL(https://zupimages.net/up/22/05/lqve.jpg)",
              }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Créer un compte</h3>
              <div className="mt-6 text-center">
                <GoogleLogin
                  clientId="561183481745-0qu7etl4sdp0v7kg09e0a2cqinu9k22u.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="http://localhost:3000"
                  isSignedIn={true}
                />
              </div>

              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Prénom
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={firstname}
                      type="text"
                      placeholder="Prénom"
                      defaultValue={GoogleUser?.givenName}
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
                      placeholder="Nom"
                      defaultValue={GoogleUser?.familyName}
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Votre pseudo
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={username}
                      type="text"
                      placeholder="Pseudo"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Selectionnez votre genre
                    </label>
                    <select
                      className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      ref={sexe}
                      required="required"
                    >
                      <option value="Autre">Autre</option>
                      <option value="Homme"> Homme </option>
                      <option value="Femme"> Femme </option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    ref={email}
                    type="email"
                    placeholder="Email"
                    defaultValue={GoogleUser?.email}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Date de naissance
                    </label>
                    <DatePicker
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      selected={startDate}
                      onChange={(date) => setstartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      ref={age}
                      required="required"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>
                <div className="mb-6 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-6 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    ref={password}
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={postform}
                  >
                    S'enregistrer
                  </button>
                </div>
                <div className="mb-4 text-center">
                  <button
                    className="w-full px-1 py-2  text-blue-500 bg-white rounded-full hover:font-bold focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => props.setMode(false)}
                  >
                    Vous avez déjà un compte ? Connectez-vous !
                  </button>
                </div>

                {RegisterRes && (
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
                    <span className="block sm:inline">{RegisterRes}</span>
                  </div>
                )}
                {RegisterErr && (
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
                    <span className="block sm:inline">{RegisterErr}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
