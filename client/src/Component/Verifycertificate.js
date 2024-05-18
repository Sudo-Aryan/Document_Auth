import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API requests
import './Verifycertificate.css';
import { data } from 'jquery';

const Verifycertificate = ({ verifier }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation(); // Get data passed from Login page
  const navigate = useNavigate(); // Import and call useNavigate

  // Access the user object from the state
  const user = location.state?.user;
  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Prepare data for API request
    const formData = new FormData();
    formData.append('verifierName', user?.username || '');
    formData.append('useraddress', user?.useraddress || '');

    if (!file) {
      setError('Please select a certificate file to upload.');
      setIsLoading(false);
      return;
    }

    formData.append('doc', file);

    try {
      const response = await axios.post('http://localhost:3000/verifier/verifyCertificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming successful response structure
      console.log(response.data);

      if (response.data.message) { // Successful verification
        console.log('Verification successful');
        alert('Verification successful');
      } else {
        alert('Failed Verification');
        console.log('Failed Verification');
      }
    } catch (err) {
      console.error('Error verifying certificate:', err);
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-900 text-white py-5 flex flex-col items-center justify-center">
        <div className="card-body">
          <h3>{user?.username || 'Verifier'}</h3>
          <form className="Form-group" onSubmit={handleSubmit}>
            <input hidden type="text" name="verifierName" value={verifier?.username || ''} />
            <input hidden type="text" name="useraddress" value={user?.useraddress || ''} />
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Verify Certificate'}
            </button>
            {error && <p className="error">{error}</p>}
            {name && <p>Student Name: {name}</p>} {/* Display retrieved name */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Verifycertificate;
