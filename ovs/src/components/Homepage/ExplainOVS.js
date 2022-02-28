import React from "react";
import Slider from "./Slider/Slider";
import { Link } from "react-router-dom";
import AvatarA from "../../images/avatarA.gif";
import { useCookies } from "react-cookie";
function Explain() {
  const [Cookies] = useCookies();
  return (
    <div className="lg:grid grid-cols-6 gap-6 lg:text-left">
      <div className="text-center col-span-2 px-10 py-10">
        <p className="animate-pulse text-5xl lg:animate-pulse font-bold text-white">
          On Va Sporter !
        </p>
        <div className="pt-10 text-2xl font-bold text-white">
          Besoin de motivation ? D'un partenaire sportif ou d'un joueur pour
          compléter l'équipe ?
        </div>
        <div className="pt-6 text-3xl lg:pt-4 font-bold text-white">
          OVS est là !
        </div>
        <div className="pt-4 text-2xl font-bold text-white">
          Fais ta demande directement auprès de ceux qui recherchent une
          activité, et lancez-vous !
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          {Cookies.token ? (
            <Link
              to="/account"
              className="transition m-auto w-[8rem] h-[4rem] ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-2 rounded-lg overflow-hidden relative inline-flex group items-center justify-center cursor-pointer text-white font-bold"
            >
              <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full group-hover:w-52 group-hover:h-52"></span>
              <div className="flex items-center absolute">
                <img
                  alt="avatar"
                  src={AvatarA}
                  className="w-7 rounded-full float-left mr-1"
                />
                <p className="text-center">Ma page</p>
              </div>
            </Link>
          ) : (
            <Link
              to="/account"
              className="transition m-auto w-[8rem] h-[4rem] ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-2 rounded-lg overflow-hidden relative inline-flex group items-center justify-center cursor-pointer text-white font-bold"
            >
              <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full group-hover:w-52 group-hover:h-52"></span>
              <div className="flex items-center absolute">
                <img
                  alt="avatar"
                  src={AvatarA}
                  className="w-7 rounded-full float-left mr-1"
                />
                <p className="text-center">S'inscrire</p>
              </div>
            </Link>
          )}
          <Link
            to="/posts"
            className="transition m-auto w-[8rem] h-[4rem] ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-2 rounded-lg overflow-hidden relative inline-flex group items-center justify-center cursor-pointer text-white font-bold"
          >
            <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full group-hover:w-52 group-hover:h-52"></span>
            <p className="text-center absolute">Voir les annonces</p>
          </Link>
        </div>
      </div>
      <div className="lg:static col-span-4">
        <Slider />
      </div>
    </div>
  );
}

export default Explain;
