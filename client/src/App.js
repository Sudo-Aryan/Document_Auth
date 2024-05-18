import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css"

import Navbar from "../src/Component/Navbar";
import Footer1 from '../src/Component/Footer1';
import Login1 from './Component/Login1';
import About from './Component/About.js';
import Registerverifier from './Component/Registerverifier';
import Registerissuer from './Component/Registerissuer';
import issuecertificate from "./Component/Issuecertificate";
import Verifycertificate from "./Component/Verifycertificate";
import CertificateGeneratorForm from './Component/Issuecertificate';
import Documents from './Component/Documents.js';
import Home from './Component/Home.js';
import Verifieddoc from './Component/Verifieddoc';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login1 />} />
        <Route path="/Login1" element={<Login1 />} />
        <Route path="/register/verifier" element={<Registerverifier />} />
        <Route path="/register/issuer" element={<Registerissuer />} />
        <Route path="/issuecertificate" element={<CertificateGeneratorForm />} />
        <Route path="/verifycertificate" element={<Verifycertificate />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/Verifieddoc" element={<Verifieddoc />} />
        <Route path="/About" element={<About/>} />
        
       
      </Routes>
      {/* <Footer1 /> */}
    </>
  );
};

export default App;






