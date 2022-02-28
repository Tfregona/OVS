import React from "react";

function Quote() {
  return (
    <div className="bg-sky-900 text-white py-5">
      <h2 className="text-center mb-4 underline underline-offset-8">Citation</h2>
      <div className="grid">
        <div className="m-auto bg-blue-500/50 rounded-lg shadow p-8">
          <h2 className="italic text-right text-blue-darkest leading-normal">
            "Se réunir est un début, rester ensemble est un progrès, travailler
            ensemble est la réussite."
          </h2>
          <p className="text-center pt-8 text-grey-darker">- Henry Ford</p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
