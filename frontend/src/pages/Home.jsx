import React from "react";
import Header from "../components/UserHader.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <h1 style={{ color: '#000' }}>Home</h1>
      <p style={{ fontSize: '16px', color: '#333' }}>
        Welcome to the About page! Here you can learn more about our mission, vision, and values.
      </p>
    </>
  );
};

export default Home;
