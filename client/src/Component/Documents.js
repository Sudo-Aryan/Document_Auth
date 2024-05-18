import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';

const Table = (props) => {
  const [tableData, setTableData] = useState([]);
  const location = useLocation(); // Get data passed from Login page
 
  
  // Access the user object from the state
  const username = location.state?.username;
  // console.log(username)


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.username); // Log the username prop
        const result = await fetch(`http://localhost:3000/issuer/profile/${username}`);
        const {data} = await result.json()
      
        console.log(data); // Log the data
        setTableData(data);
      } catch (error) {
        // console.log(error);npm start
      }
    }

    fetchData();
  }, []);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Document hash</th>
          <th>Transaction Id</th>
          <th>Issued To</th>
          <th>Course Name</th>
          <th>Uploaded on (Date)</th>
        </tr>
      </thead>
      <tbody>
  {tableData && tableData.map((row, index) => {
    console.log(row); // Log the row data
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{row.doc_Hash}</td>
        <td>{row.transactionHashId}</td>
        <td>{row.issuedTo}</td>
        <td>{row.course_name}</td>
       
        <td>{row.timestamp}</td>
      </tr>
    )
  })}
  
</tbody>
    </table>
  );
};

export default Table;