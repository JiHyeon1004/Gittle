import React from "react";
import Logo from "../components/Main/Logo"
import Buttons from "../components/Main/Buttons"
import Tutorial from "../components/Main/Tutorial"
import Repositories from "../components/Main/Repositories"
import LoginButton from "../components/Main/LoginButton"


function MainPage() {

  return (
    <div>
      <Logo/>
      <Buttons/>
      <Tutorial/>
      <Repositories/>
      <LoginButton />
    </div>
  );
}

export default MainPage;
