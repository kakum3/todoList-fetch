import React, { useState, useEffect } from "react";
import ListaTareas from "./listaTareas.jsx";

const Home = () => {
  return (
    <div className="container-fluid m-auto  text-center">
      <div className="row col-12 col-sm-10 lg-6">
        <h1 className="todos ">Todos</h1>
      </div>

      <div className=" row justify-content-center align-item-center ">
        <div className="form text-center">
          <ListaTareas />
        </div>
      </div>
    </div>
  );
};

export default Home;
