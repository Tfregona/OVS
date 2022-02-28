import React from "react";
import Cards from "./Cards/CardsQSN";
import Testimony from "./Testimony/Testimony";
function QSN() {
  return (
    <div>
      <div className="p-10 text-center animate-pulse text-6xl lg:animate-pulse font-bold text-white">
        Qui sommes nous ?
      </div>
      <div className="lg:grid grid-cols-2 lg:p-10 ">
        <div className="text-left md:text-left text-2xl lg:text-3xl font-bold text-white">
          <div className="text-justify p-4 lg:p-10">
            Pourquoi onvasporter.link ?
          </div>
          <div className="text-justify p-4 lg:p-10 text-xl">
            Le principe du site a germé dans l’esprit de Brenda & Brandon un
            soir de janvier 2022. Cherchant un partenaire pour leur habituel
            rendez-vous de streetball du mardi, ils eurent l’idée d’un site qui
            mettrait en relation tous les sportifs à la recherche de
            partenaires, près de chez eux. Ainsi est né onvasporter.link, d’une
            simple idée.
          </div>
          <div className="text-justify p-4 lg:p-10 text-xl">
            Brenda & Brandon ont ensuite transformé l’idée en projet et l’ont
            développée avec la Coding Academy d’Epitech, autour des valeurs du
            sport et ses bienfaits : engagement, santé, partage, dépassement de
            soi.
          </div>
          <div>
            <Testimony />
          </div>
        </div>
        <div>
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default QSN;
