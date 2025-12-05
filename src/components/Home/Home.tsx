import React from "react";
import LandingPage from "./LandingPage";
import CraftPage from "./CraftPage";
import AboutUsPage from "./AboutUsPage";
import ContactPage from "./ContactPage";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col font-sans">
      <div id="landing">
        <LandingPage />
      </div>
      <div id="about">
        <AboutUsPage />
      </div>
      <div id="crafts">
        <CraftPage />
      </div>
      <div id="contact">
        <ContactPage />
      </div>
    </div>
  );
};

export default Home;
