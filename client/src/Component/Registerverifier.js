import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Registerverifier";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Registerverifier= () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [emailAuth, setEmailAuth] = React.useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Run code here that you want to execute when the component mounts
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      useraddress: event.target.useraddress.value,
      role: 'VERIFIER_ROLE', // Assuming this is a constant value
      username: event.target.InstituteName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      let serverResponse = await response.json();
      if (!response.ok) { // Check for non-2xx status codes
        setEmailAuth(serverResponse.message);
        console.log(serverResponse.message);
        alert('Registration failed. ');
        return; // Exit the function if response is not successful
      }
  
      const {user} = serverResponse; // Parse the response as JSON
      console.log(user)
      if (response.ok) { // Check for success in the response data
        alert('Registration Successful');
        // setShowPopup(true);
        navigate('/Verifycertificate',{ state: { user: user } });
      } else {
        alert( ' Registration failed.'); // Handle any error message
      }

      // if (response.ok) {
      //   console.log('Form submitted successfully!');
      //   setShowPopup(true);
      // } else {
      //   console.error('Form submission failed!');
      //   // Handle error or show an error message to the user
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  // const handlePopupClose = () => {
  //   setShowPopup(false); // Hide success popup
  //   navigate('/Verifycertificate'); // Navigate to the Signup.js filen
  // };
    return (
      <>
        <div className='Wrapper'>
            <form class="w-full" onSubmit={handleSubmit} method="POST">
                <h1>Verifier Signup</h1>
                <div className="input-box">
                    <input type="text" id="useraddress" name="useraddress" placeholder='Username' required />
                    <input type="email" id="email" name="email"placeholder='Email' required />
        <input type="text" id="instituteName" name="InstituteName"placeholder='InstituteName'required/>
                    <input type="text" id="Password" name="password" placeholder='Password' required />
                    
                   
                </div>
                <button type="submit">Signup</button>
                <div>
              <p style={{color: '#fff'}}>{emailAuth}</p>
            </div>
                <div className='account'>
  Already have an account?{' '}
  <Link to="/Login1"className="text-blue-500 text-center" > Log In </Link> 
 
    
 
 </div>
            </form>
            
        </div>
        </>
      
    );
};

export default Registerverifier;