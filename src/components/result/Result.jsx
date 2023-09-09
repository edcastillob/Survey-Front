import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSurvey, getSurvey } from "../../redux/actions/actions";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

import { EditSurvey } from "../editSurvey/EditSurvey";
import { Link } from "react-router-dom";
import swal from "sweetalert";

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
  // inicio y final para mostrar los registros
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Filtra los registros
  const recordsToDisplay = survey.slice(startIndex, endIndex);
  // total de páginas
  const totalPages = Math.ceil(survey.length / itemsPerPage);
  //  cambiar de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const toggle = () => setModal(!modal);

  const changeBackdrop = (e) => {
    let { value } = e.target;
    if (value !== "static") {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  const changeKeyboard = (e) => {
    setKeyboard(e.currentTarget.checked);
  };

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

  return (
    <div className="container">
      <h2>Resultados de la Encuesta</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Cómo Encontró</th>
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
                  <td>{item.full_name}</td>
                  {/* <td>{item.how_found}</td> */}
                  <td>
                    {(() => {
                      switch (item.how_found) {
                        case "friends":
                          return "Amigos";
                        case "online_search":
                          return "Búsqueda en línea";
                        case "advertisement":
                          return "Publicidad";
                        default:
                          return "Default";
                      }
                    })()}
                  </td>
                  <td>{item.newsletter_subscription ? "Sí" : "No"}</td>
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
          {/* componente de paginación */}
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            pageCount={totalPages}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLinkClassName={"btn btn-primary"}
            nextLinkClassName={"btn btn-primary"}
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
        >
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <EditSurvey />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
