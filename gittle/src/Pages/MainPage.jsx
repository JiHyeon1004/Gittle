import React from "react";
import Logo from "../Components/Main/Logo"
import Buttons from "../Components/Main/Buttons"
import Tutorial from "../Components/Main/Tutorial"
import Repositories from "../Components/Main/Repositories"
import LoginButton from "../Components/Main/LoginButton"


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
