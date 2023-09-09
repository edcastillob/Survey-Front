import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSurvey,
  getSurveyId,
  surveyEdit,
} from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import archivo from "../../RequerimientoJSON/archivo.json";
import { convertJsonToArray } from "../../assets/convertJsonToArray";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const EditSurvey = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const survey = useSelector((state) => state.survey);
  const [editData, setEditData] = useState({
    full_name: survey.full_name,
    phone_number: survey.phone_number,
    start_date: survey.start_date,
    preferred_language: survey.preferred_language,
    how_found: survey.how_found,
    newsletter_subscription: survey.newsletter_subscription,
  });

  useEffect(() => {
    dispatch(getSurveyId(id));
  }, [dispatch, id, editData]);

  useEffect(() => {
    if (
      survey.full_name
      // &&
      // survey.phone_number &&
      // survey.start_date &&
      // survey.preferred_language &&
      // survey.how_found &&
      // survey.newsletter_subscription
    ) {
      setEditData({
        full_name: survey.full_name,
        phone_number: survey.phone_number,
        start_date: survey.start_date,
        preferred_language: survey.preferred_language,
        how_found: survey.how_found,
        newsletter_subscription: survey.newsletter_subscription,
      });
    }
  }, [
    survey.full_name,
    survey.phone_number,
    survey.start_date,
    survey.preferred_language,
    survey.how_found,
    survey.newsletter_subscription,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editData);
    dispatch(surveyEdit(id, editData));
    toast.info("¡Registro Modificado!");
    dispatch(getSurvey());
    setTimeout(() => {
      navigate("/result");
    }, 2000);
  };

  const inputs = convertJsonToArray(archivo);

  const [buttonDisable, setButtonDisable] = useState(true);

  const activeButton = () => {
    const { full_name, phone_number, how_found, preferred_language } = editData;
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
  }, [editData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditData((editData) => ({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(editData);
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
                  value={editData[item.name]}
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
                        checked={editData[item.name] === option.value}
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
                    checked={editData[item.name]}
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
                  value={editData[item.name]}
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
