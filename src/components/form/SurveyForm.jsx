import React, { useEffect, useState } from "react";
import archivo from "../../RequerimientoJSON/archivo.json";
import { convertJsonToArray } from "../../assets/convertJsonToArray";
import { useDispatch } from "react-redux";
import { addSurvey, getSurvey } from "../../redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./SurveyForm.module.css";

export const SurveyForm = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    full_name: "",
    phone_number: "",
    start_date: "",
    preferred_language: "default",
    how_found: "",
    newsletter_subscription: true,
  });
  const [buttonDisable, setButtonDisable] = useState(true);

  const activeButton = () => {
    const { full_name, phone_number, how_found, preferred_language } = data;
    const isDisabled =
      !full_name ||
      !phone_number ||
      !how_found ||
      preferred_language === "default";
    console.log(isDisabled);
    setButtonDisable(isDisabled);
  };

  useEffect(() => {
    activeButton();
  }, [data]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    dispatch(addSurvey(data));
    toast.success("¡Registro creado!");
    setData({
      full_name: "",
      phone_number: "",
      start_date: "",
      preferred_language: "default",
      how_found: "",
      newsletter_subscription: true,
    });
    dispatch(getSurvey()); // cargo a survey ede manera de actualizar el state global
  };

  const inputs = convertJsonToArray(archivo);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "60%" }}>
        <form onSubmit={handleSubmit}>
          <ToastContainer />

          {inputs.map((item) => (
            <div key={item.name} className="form-group">
              {item.type !== "submit" &&
                item.type !== "checkbox" &&
                item.type !== "radio" && (
                  <label htmlFor={item.name} style={{ fontWeight: "bold" }}>
                    {item.label}:
                  </label>
                )}

              {item.type === "select" ? (
                <select
                  className="form-control"
                  name={item.name}
                  value={data[item.name]}
                  onChange={handleChange}
                >
                  <option value="default">--- Seleccione ---</option>
                  {item.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : item.type === "radio" ? (
                <fieldset className="border p-2 ">
                  <legend className="w-auto form-control">{item.label}</legend>
                  {item.options.map((option) => (
                    <div
                      key={option.value}
                      className="form-check"
                      style={{ textAlign: "left" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        id={option.value}
                        name={item.name}
                        value={option.value}
                        checked={data[item.name] === option.value}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={option.value}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </fieldset>
              ) : item.type === "checkbox" ? (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    checked={data[item.name]}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={item.name}>
                    {item.label}
                  </label>
                </div>
              ) : item.type === "submit" ? (
                <button className="btn btn-primary" disabled={buttonDisable}>
                  {item.label}
                </button>
              ) : (
                <input
                  type={item.type}
                  className="form-control"
                  id={item.name}
                  name={item.name}
                  value={data[item.name]}
                  onChange={handleChange}
                  required={item.required}
                />
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
