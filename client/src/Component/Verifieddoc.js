// import React, { useState, useEffect } from 'react';
// import { useLocation} from 'react-router-dom';

// const Table = (props) => {
//   const [tableData, setTableData] = useState({});
//   const location = useLocation(); // Get data passed from Login page

//   // Access the user object from the state
//   const username = location.state?.username;
//   console.log(username)


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetch(`http://localhost:3000/verifier/profile/${username}`);
//         const {data} = await result.json();
//         console.log(result);
//         console.log(data); // Log the data
//         setTableData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <table className="table table-bordered">
//       <thead>
//         <tr>
//           <th>Sr. No.</th>
//           <th>Document hash</th>
//           <th>Verifier Name</th>
//           <th>Student Name</th>
//           <th>Uploaded on (Date)</th>
//         </tr>
//       </thead>
//       <tbody>
//     {console.log(tableData)}
//   {tableData && tableData.map((row, index) => {
//     console.log(row); // Log the row data
//     return (
//       <tr key={index}>
//         <td>{index + 1}</td>
//         <td>{row.hash}</td>
//         <td>{row.verifierName}</td>
//         <td>{row.studentName}</td>
//         <td>{row.uploadDate}</td>
       
//         <td>{row.timestamp}</td>
//       </tr>
//     )
//   })}
  
// </tbody>
//     </table>
//   );
// };

// export default Table;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Table = (props) => {
  const [tableData, setTableData] = useState([]);
  const location = useLocation(); // Get data passed from Login page

  // Access the user object from the state
  const username = location.state?.username;
  console.log(username)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:3000/verifier/profile/${username}`);
        const data = await result.json();
        console.log(result);
        console.log(data); // Log the data
        
        setTableData(data.doc);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [username]); // Include username in the dependency array

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Document hash</th>
          <th>Verifier Name</th>
          <th>Student Name</th>
          <th>Uploaded on (Date)</th>
        </tr>
      </thead>
      <tbody>
        {console.log(tableData)}
        {tableData && tableData.map((row, index) => {
          console.log(row); // Log the row data
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.hash}</td>
              <td>{row.verifierName}</td>
              <td>{row.studentName}</td>
              <td>{row.uploadDate}</td>
              <td>{row.timestamp}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Table;
