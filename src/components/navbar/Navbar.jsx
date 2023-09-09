import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img
          src="https://raw.githubusercontent.com/edcastillob/Countries-ProyectoIndividual/main/client/src/assets/ec.png"
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        . Survey App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/survey" className="nav-link">
              Agregar Encuesta
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/result" className="nav-link">
              Resultados
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
