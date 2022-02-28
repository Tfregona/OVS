import React, { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "react-datepicker/dist/react-datepicker.css";

function Auth() {
  const [registerMode, setRegisterMode] = useState(false);

  const setMode = (q) => {
    setRegisterMode(q);
  };

  return (
    <div>
      {!registerMode ? (
        <Login setMode={setMode} />
      ) : (
        <Register setMode={setMode} />
      )}
    </div>
  );
}

export default Auth;
