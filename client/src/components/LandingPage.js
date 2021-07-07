import React from 'react';

import logo from '../assets/CaloreeLogo.png';

const LandingPage = () => {
  return (
    <div id="landing-page">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={logo} style={{}} />
      </div>

      <h2 class="ui center aligned header">
        <div class="content">
          Caloree
          <div class="sub header">
            Extremely simple, extremely customizable calory tracker.
          </div>
        </div>
      </h2>
      <div style={{ textAlign: 'center' }}>
        <a href="/auth/google" className="ui red google button">
          <i class="google icon"></i>
          Log In/Sign un with Google
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
