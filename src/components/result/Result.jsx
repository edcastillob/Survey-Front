import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSurvey, getSurvey, orderContact } from "../../redux/actions/actions";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/logo.png';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import { EditSurvey } from "../editSurvey/EditSurvey";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import yes from '../../assets/yes.jpg';
import not from '../../assets/no.png';
import { SearchBar } from "../searchBar/SearchBar";
import style from './Result.module.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";


export const Result = () => {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);

  useEffect(() => {
    if (!survey.length) {
      dispatch(getSurvey());
    }
  }, [dispatch, survey]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const recordsToDisplay = survey.slice(startIndex, endIndex);
  const totalPages = Math.ceil(survey.length / itemsPerPage);
 
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const toggle = () => setModal(!modal);




  const handleDelete = (itemId) => {
    swal({
      title: "Atención",
      text: "Desea eliminar esta encuesta ?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((res) => {
      if (res) {
        dispatch(deleteSurvey(itemId));
        swal({
          text: "Registro de encuesta Emininado..!!!",
          icon: "success",
        });
       
      }
    });
  };
  const handleDeleteModal = (itemId) => {
    swal({
      title: "Atención",
      text: "Desea eliminar esta encuesta ?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((res) => {
      if (res) {
        dispatch(deleteSurvey(itemId));
        swal({
          text: "Registro de encuesta Emininado..!!!",
          icon: "success",
        });
       toggle();
      }
    });
  };

  const handleOrder = (event) => {
    console.log(event.target.value)
    event.preventDefault();
    dispatch(orderContact(event.target.value))
  
  };

// console.log('___ ',survey)
const [searchResults, setSearchResults] = useState([]);

const handleSearch = (searchTerm) => {
  const results = survey.filter((item) =>
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (results.length){
    setSearchResults(results);   
    toggle();    
  } else{
    toast.warning(`${searchTerm}, no existe`)
    console.log('__',searchTerm)
  }
  
 
 
};
  return (
    <div className="container">
      <h2>Resultados de la Encuesta</h2>
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />
                {/* -------------------------------------------------- */}

                  {/* Ordenar ascendente y descendente */}
                  <select                    
                    name="order"
                    id="order"
                    onChange={handleOrder}
                  >
                    <option>Tipo de contacto</option>
                    <option value="friends">Amigos</option>
                    <option value="online_search">Busqueda Online</option>
                    <option value="advertisement">Publicidad</option>
                    <option value="all">Todos</option>
                  </select>


          {/* -------------------------------------------------- */}
          <br />
          <hr />
      <div className="table-responsive">
        <table className="table table-bordered" style={{ textAlign:"center"}}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Encuentro por</th>
              <th>Suscripción al Boletín</th>
              <th>Número de Teléfono</th>
              <th>Idioma Preferido</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(recordsToDisplay) &&
              recordsToDisplay.map((item) => (
                <tr key={item.id}>
                  <td style={{ background:'#759eff'}}>{item.full_name}</td>
                  {/* <td>{item.how_found}</td> */}
                  <td>
                    {(() => {
                      switch (item.how_found) {
                        case "friends":
                          return "Amigos";
                        case "online_search":
                          return "Búsqueda en linea";
                        case "advertisement":
                          return "Publicidad";
                        default:
                          return "Default";
                      }
                    })()}
                  </td>
                  <td>{item.newsletter_subscription 
                  ? (<img style = {{ width:'20px'}} src={yes} alt="Si" />) 
                  : (<img style = {{ width:'20px'}} src={not} alt="No" />)}</td>
                  <td>{item.phone_number}</td>
                  {/* <td>{item.preferred_language}</td> */}
                  <td>
                    {(() => {
                      switch (item.preferred_language) {
                        case "english":
                          return "Inglés";
                        case "spanish":
                          return "Español";
                        case "french":
                          return "Francés";
                        case "german":
                          return "Alemán";
                        default:
                          return "Default";
                      }
                    })()}
                  </td>
                  {/* <td>{item.start_date}</td> */}
                  <td>
                    {item.start_date
                      ? new Date(item.start_date).toLocaleDateString()
                      : ""}
                  </td>

                  <td>
                    {/* <button
                  className="btn FiEdit"
                  onClick={toggle}
                >
                  <FaEdit />
                </button>{" "} */}
                    <Link to={`/surveyEdit/${item.id}`} className="btn FiEdit">
                      <FaEdit />
                    </Link>{" "}
                    <button
                      className="btn RiDeleteBin5Line"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <br />
          {/* componente de paginación */}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"____"}
            pageCount={ totalPages } 
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLinkClassName={"btn btn-dark"}
            nextLinkClassName={"btn btn-dark"}
          />
        </table>
      </div>

      {/* //modal edit */}
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}></Form>
        <Modal
          isOpen={modal}
          toggle={toggle}
          backdrop={backdrop}
          keyboard={keyboard}
          className={style.modalFullscreen}
        >
          <ModalHeader toggle={toggle}><img style={{width:'45px'}}
          src={logo} alt="Edwar Castillo" /> Busqueda por nombre - Survey App</ModalHeader>
          <ModalBody>
          <div className="table-responsive">
        <table className="table table-bordered" style={{ textAlign:"center"}}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Encuentro por</th>
              <th>Suscripción al Boletín</th>
              <th>Número de Teléfono</th>
              <th>Idioma Preferido</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(searchResults) &&
              searchResults.map((item) => (
                <tr key={item.id}>
                  <td style={{ background:'#759eff'}}>{item.full_name}</td>
                  {/* <td>{item.how_found}</td> */}
                  <td>
                    {(() => {
                      switch (item.how_found) {
                        case "friends":
                          return "Amigos";
                        case "online_search":
                          return "Búsqueda en linea";
                        case "advertisement":
                          return "Publicidad";
                        default:
                          return "Default";
                      }
                    })()}
                  </td>
                  <td>{item.newsletter_subscription 
                  ? (<img style = {{ width:'20px'}} src={yes} alt="Si" />) 
                  : (<img style = {{ width:'20px'}} src={not} alt="No" />)}</td>
                  <td>{item.phone_number}</td>
                  {/* <td>{item.preferred_language}</td> */}
                  <td>
                    {(() => {
                      switch (item.preferred_language) {
                        case "english":
                          return "Inglés";
                        case "spanish":
                          return "Español";
                        case "french":
                          return "Francés";
                        case "german":
                          return "Alemán";
                        default:
                          return "Default";
                      }
                    })()}
                  </td>
                  {/* <td>{item.start_date}</td> */}
                  <td>
                    {item.start_date
                      ? new Date(item.start_date).toLocaleDateString()
                      : ""}
                  </td>

                  <td>
                   
                    <Link to={`/surveyEdit/${item.id}`} className="btn FiEdit">
                      <FaEdit />
                    </Link>{" "}
                    <button
                      className="btn RiDeleteBin5Line"
                      onClick={() => handleDeleteModal(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <br />
          {/* componente de paginación */}
          
        </table>
      </div>
          </ModalBody>
          <ModalFooter>
          
            <Button className="btn btn-dark" onClick={toggle}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
