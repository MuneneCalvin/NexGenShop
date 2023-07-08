import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain = "dev-8p6c8g3ktchsc5w8.us.auth0.com"
    clientId = "lZE1bD0jYoqnz2A66PhEBxujvByVZkln"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>  
);

reportWebVitals();
