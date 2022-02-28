import React, { useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Private = "c99a65d5-9a38-4a6d-a72d-297e2981a22b";

const Login = (props) => {
  const ApiUrl = "http://localhost:3030/api/user/login";
  const [LoginResult, setLoginResult] = useState();
  const [Cookies, setcookie] = useCookies(["token", "role", "id", "username", "idchat"]);
  const email = useRef();
  const password = useRef();

  // LOGIN
  async function postform() {
    const userData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(ApiUrl, userData);
      const result = res.data.message;
      const token = res.data.token;
      const role = res.data.role;
      const id = res.data.Id;
      const username = res.data.username
      setLoginResult(result);
      if (res.status === 200) {
        setcookie("token", token);// <= CREATE COOKIE "TOKEN"
        setcookie("username", username)
        setcookie('chat', userData.password)
        setcookie("id", id); 
        if (role === "Skywalker") {
          setcookie("role", role);
        } else if (role === "StormTrooper") {
          setcookie("role", role);
        }
        const configchat = {
          method: "PUT",
          url: 'https://api.chatengine.io/users/',
          headers: {
            "PRIVATE-KEY": Private
          },
          data: {
            "username": username
          }
        }
        const chatRes = await axios(configchat);
        const chatid = chatRes.data.id;
        setcookie("idchat", chatid)
      }
    } catch (err) {
      const error = err.response.data.message;
      setLoginResult(error);
    }
  }
  // END LOGIN

  return (
    <div>
      
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {LoginResult && (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded-lg"
              role="alert"
            >
              <p className="font-bold">{LoginResult}</p>
            </div>
          )}
        </div>
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage: "URL(https://zupimages.net/up/22/05/lqve.jpg)",
              }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Connectez-vous</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    ref={email}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-6 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Mot de passe
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      ref={password}
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="mb-8 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={postform}
                  >
                    Se connecter
                  </button>
                </div>
                <div className="mb-4 text-center">
                  <button
                    className="w-full px-4 py-2  text-blue-500 bg-white rounded-full hover:font-bold focus:outline-none focus:shadow-outline"
                    type="button"
                    /* onClick={postform} */
                  >
                    {/* Vous avez oublié votre mot de passe ? */}
                  </button>
                </div>
                <div className="mb-4 text-center">
                  <button
                    className="w-full px-1 py-2  text-blue-500 bg-white rounded-full hover:font-bold focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => props.setMode(true)}
                  >
                    Vous n'avez pas de compte ? Enregistrez-vous !
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
