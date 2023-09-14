
import React, { useState } from "react";
import { toast } from "react-toastify";

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!/^[A-Za-z\s]*$/.test(searchTerm)) {
      toast.warning('Ingrese solo texto');
      setSearchTerm('');
      return;
    }

    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className="btn btn-dark"
          type="button"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
