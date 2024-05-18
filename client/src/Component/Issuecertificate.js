import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import './Issuecertificate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Issuecertificate = ({ issuer }) => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  const [OrgName, setOrgName]= useState('');
  const [useraddress, setUserAddress]= useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get data passed from Login page
  
  // Access the user object from the state
  const user = location.state?.user;
  console.log(user)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('CourseName', course);
    formData.append('OrgName', user?.username || '');
    formData.append('useraddress', user?.useraddress || '');
    formData.append('doc', file);

    try {
      const response = await axios.post('http://localhost:3000/issuer/generateCertificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      navigate('/Documents',{ state: { username: user.username } }); 

    } catch (err) {
      console.error(err.message);
    }
  };

    return (
        <div className='Wrapper1'>
            <div className="flex1 flex-col items-center gap-5 px-4">
  <h3 style={{color: '#fff'}}>{user?.username || ''}</h3>
  <form
    className="w-full"
    action="http://localhost:3000/issuer/generateCertificate"
    method="post"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col">
    <input
      className="input-field"
      type="text"
      placeholder="Name"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <div className="mt-2"> 
    <input
      className="input-field"
      type="text"
      placeholder="Course"
      name="CourseName"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
    />
    </div>
   </div>
    <input type="file" id="file" name="doc" onChange={(e) => setFile(e.target.files[0])} required />
    <button type="submit">Issue Certificate</button>
   
  </form>
</div>
          </div>
        
    );
};

export default Issuecertificate;