// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const Register = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [type, setType] = useState('user'); // Default type is 'user'

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const userData = {
// //       name,
// //       email,
// //       password,
// //       type,
// //     };
// //     console.log('User Data:', userData);
// //     // Send userData to your API here
// //   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ height: '100vh' }}
//     >
//         <h1>Register</h1>
//       {/* <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
//         <h2 className="text-center mb-4">Register</h2>
        
//         <Form.Group controlId="formName">
//           <Form.Label>Full Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter full name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formEmail" className="mt-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formPassword" className="mt-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="formType" className="mt-3">
//           <Form.Label>User Type</Form.Label>
//           <Form.Select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             required
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </Form.Select>
//         </Form.Group>

//         <Button variant="primary" type="submit" className="w-100 mt-4">
//           Register
//         </Button>
//       </Form> */}
//     </div>
//   );
// };

// export default Register;
import React from "react";
import Header from "../../components/Header";

const  Register= () => {
  return (
    <>
      <Header />
      <h1 style={{ color: '#000' }}>About Us</h1>
      <p style={{ fontSize: '16px', color: '#333' }}>
    Sign Up
          </p>
    </>
  );
};

export default Register;
