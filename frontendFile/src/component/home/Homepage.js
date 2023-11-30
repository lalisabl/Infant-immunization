// commonHomepage.js
import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Navbar from "./navbar/navBar";
import News from "./news/news";
import SignIn from "../common/signinForm";
import SignUp from "../common/signupForm";
import Footer from "../../section/footer/footer";

const Homepage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignInClick = () => {
    setIsSignInVisible(true);
    setIsSignUpVisible(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpVisible(true);
    setIsSignInVisible(false);
  };
  const handleClose = () => {
    setIsSignUpVisible(false);
    setIsSignInVisible(false);
  };
  return (
    <div>
      <Navbar
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      <Header />
      <News />
      <div onClick={() => {}} className="account">
        {isSignInVisible && <SignIn close={handleClose} />}
        {isSignUpVisible && <SignUp close={handleClose} />}
      </div>
      <Footer />
    </div>
  );
};
export default Homepage;
