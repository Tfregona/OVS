import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import avatarF from "../../images/avatarF.gif";
import avatarH from "../../images/avatarH.gif";
import avatarA from "../../images/avatarA.gif";
import Spinner from "../../components/loading/Spinner";
import { useCookies } from "react-cookie";
function Edit() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const ApiUrl = "http://localhost:3030/api/user";
  const [UserAge, setAge] = useState();
  const [Cookies] = useCookies();
  const [deleteResult, setDeleteResult] = useState(null);

  // GET
  React.useEffect(() => {
    axios.get(`${ApiUrl}/${id}`).then((response) => {
      setUserData(response.data);
      let date = new Date(response.data.age);
      setAge(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    });
  }, []);
  // END GET

  // DELETE
  async function deleteDataById(_id) {
    const id = _id;

    if (id) {
      try {
        const res = await axios.delete(`http://localhost:3030/api/user/${id}`, {
          headers: {
            "auth-token": Cookies.token,
          },
        });
        const result = res.data.mesage;
        setDeleteResult(result);
      } catch (err) {
        console.log("error api");
      }
    }
  }
  // END DELETE

  if (!userData) return <Spinner />;

  return (
    <div className="mt-8">
      <div className="grid justify-items-center grid-cols-2 gap-2">
        <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 mx-10 max-w-xs col-span-2 md:col-span-1">
          {userData.avatar ? (
            <img
              alt="avatar"
              className="mb-3 w-100 h-100 rounded-full shadow-lg mx-auto"
              src={userData.avatar.image}
            />
          ) : (
            <img
              className="mb-3 w-100 h-100 rounded-full shadow-lg mx-auto"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="product designer"
            />
          )}
          <h1 className="text-lg text-black-400">
            {userData.firstname} {userData.lastname}
          </h1>

          <h3 className="text-sm text-black-400 ">
            {userData.admin === false ? "User" : "Admin"} - {userData.username}
          </h3>
          {userData.admin === false ? (
            <p className="font-light text-sm">User</p>
          ) : (
            <p className="font-light text-sm">Admin</p>
          )}

          <div className="text-xs grid justify-items-center text-black-400 mt-4">
            {userData.sexe === "Homme" ? (
              <div className="flex items-center">
                <img
                  src={avatarH}
                  style={{ width: "2.5rem", display: "block" }}
                  alt="Genre"
                />
                <p>Homme</p>
              </div>
            ) : userData.sexe === "Femme" ? (
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
          <h3 className="text-sm text-black-400 "> {userData.email} </h3>
          <button className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
            Envoyer un message
          </button>
          {Cookies.role === "Skywalker" && (
            <>
              <Link to={`/edituser/${id}`}>
                <button className="bg-yellow-500 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
                  Modifier l'utilisateur
                </button>
              </Link>
              <button
                onClick={() => deleteDataById(id)}
                className="bg-red-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
              >
                Supprimer l'utilisateur
              </button>
            </>
          )}
        </div>

        <div className="w-full px-10 mx-1 md:mx-10 grid grid-cols-1 place-content-end col-span-2 md:col-span-1">
          <form acceptCharset="UTF-8" method="post">
            <input type="hidden"></input>
            <textarea
              className="w-full shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-2xl"
              placeholder={`Donnez votre avis sur ${userData.firstname} ${userData.lastname}`}
              cols="5"
              rows="5"
              spellCheck="false"
            ></textarea>
            <button
              type="button"
              className="font-bold opacity-50 cursor-not-allowed py-2 px-4 w-full bg-indigo-400 text-lg text-white shadow-md rounded-lg "
            >
              Commenter
            </button>
          </form>
        </div>
      </div>

      <div className="mx-1 md:mx-10">
        <section className="rounded-b-lg  mt-4 ">
          <div id="task-comments" className="pt-4">
            <div className="bg-white rounded-lg p-2  flex flex-col justify-center items-center md:items-start shadow-lg mb-2">
              <div className="flex flex-row justify-center mr-2">
                <img
                  alt="avatar"
                  width="48"
                  height="48"
                  className="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
                  src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
                />
                <h3 className="text-purple-600 font-semibold text-lg text-center md:text-left ">
                  @Shanel
                </h3>
              </div>
              <p>C'était super de faire du bowling aérien avec Michel !</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Edit;
