import React from 'react';
import LandingPage from './LandingPage';
import CraftPage from './CraftPage';
import AboutUsPage from './AboutUsPage';
import ContactPage from './ContactPage';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col font-sans'>
      <LandingPage />
      <AboutUsPage />
      <CraftPage />
      <ContactPage />
    </div>
  );
};

export default Home;
