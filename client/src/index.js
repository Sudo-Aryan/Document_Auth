import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login1 from './Component/Login1';
// import Signup from './Component/Signup';
import Registerissuer from './Component/Registerissuer'
import Registerverifier from './Component/Registerverifier';
 import Verifycertificate from "./Component/Verifycertificate"
import CertificateGeneratorForm from './Component/Issuecertificate';
import About from './Component/About';





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Signin",
    element: <Login1 />,
  },
  {
    path: "Registerissuer",
    element: <Registerissuer />,
  },
  {
    path: "AboutUs",
    element: <About />,
  },
  {
    path: "Registerverifier",
    element: <Registerverifier />,
  },
  {
    path: "/Login1",
    element: <Login1 />,
  },
  // {
  //   path: "/Issuecertificate", // Corrected route path
  //   element: <CertificateGeneratorForm />,
  // },
  {
    path: "/Verifycertificate", // Corrected route path
    element: <Verifycertificate />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
