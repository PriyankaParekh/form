import React, { useState, useEffect } from "react";
import ProgressBar from "./progressbar";
import StepsComponent from "./steps-component";
import { obj } from "../utils/obj";
import { useNavigate } from "react-router-dom";

function DynamicForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState(null);

  // State variables for form fields
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConfigData() {
      const savedData = JSON.parse(localStorage.getItem("FormData")) || {};
      console.log(savedData);
      setConfig(obj);
      if (savedData.currentStep) {
        setCurrentStep(savedData.currentStep);
      } else {
        setCurrentStep(0);
      }
      setData(savedData.formData || {});
    }
    fetchConfigData();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < config.steps.length - 1) {
      // Check if it's not the last step
      setCurrentStep(currentStep + 1); // Move to the next step
    } else {
      // Handle form submission when it's the last step
      console.log("Form submitted!");
      localStorage.removeItem("FormData"); // Remove saved form data
      navigate("/thankyou");
    }
    localStorage.setItem(
      "FormData",
      JSON.stringify({ currentStep: currentStep, formData: data })
    );
  };

  // Function to generate form fields for the current step
  const generateFormFields = () => {
    if (!config) return null;
    const step = config.steps[currentStep];
    const fields = config.fields[step.step];
  
    return fields.map((field, index) => {
      return (
        <div key={index} className="mb-3">
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          {field.field_type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              cols={50}
              rows={4}
              className="form-control text-uppercase border rounded-lg p-2"
              placeholder={field.placeholder}
              value={data[field.name] || field.default_value || ""}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  [field.name]: e.target.value,
                }))
              }
            />
          ) : field.field_type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={data[field.name] || field.default_value || ""}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  [field.name]: e.target.value,
                }))
              }
              className="form-select text-uppercase border rounded-lg p-2"
            >
              {field.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.field_type === "checkbox" ? (
            <>
              {field.options && field.options.length !== 0 && field.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-check">
                  <input
                    className="form-check-input text-uppercase"
                    type="checkbox"
                    id={`${field.name}-${optionIndex}`}
                    name={field.name}
                    value={option}
                    checked={data[field.name]?.includes(option)}
                    onChange={(e) =>
                      setData((prevData) => {
                        const isChecked = e.target.checked;
                        const currentValue = prevData[field.name] || [];
  
                        // If checkbox is checked, add the option to the array, otherwise remove it
                        const updatedValue = isChecked
                          ? [...currentValue, option]
                          : currentValue.filter((item) => item !== option);
  
                        return {
                          ...prevData,
                          [field.name]: updatedValue,
                        };
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${field.name}-${optionIndex}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
              {field.options.length === 0 && (
                <div className="form-check">
                  <input
                    className="form-check-input text-uppercase"
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={data[field.name] || false}
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        [field.name]: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                </div>
              )}
            </>
          ) : field.field_type === "radio" ? (
            <>
              {field.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="form-check">
                  <input
                    className="form-check-input text-uppercase"
                    type="radio"
                    id={`${field.name}-${optionIndex}`}
                    name={field.name}
                    value={option}
                    checked={data[field.name] === option}
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        [field.name]: e.target.value,
                      }))
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${field.name}-${optionIndex}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </>
          ) : (
            <input
              type={field.field_type}
              id={field.data}
              name={field.name}
              placeholder={field.placeholder}
              className="form-control text-uppercase border rounded-lg p-2"
              value={data[field.name] || field.default_value || ""}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  [field.name]: e.target.value,
                }))
              }
            />
          )}
        </div>
      );
    });
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / config?.steps?.length) * 100;
  
  return (
    <>
      <ProgressBar progressPercentage={progressPercentage} />
      <StepsComponent currentPage={currentStep + 1} totalPages={config?.steps?.length} />
      <div className="container text-uppercase justify-content-center flex flex-col items-center main">
        {config && config.steps[currentStep] && (
          <>
            <h2>{config.steps[currentStep].title}</h2>
            <p>{config.steps[currentStep].description}</p>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              {generateFormFields()}
              <button type="submit" className="btn btn-primary">
                {currentStep === config.steps.length - 1 ? "Submit" : "Next"}
              </button>
            </form>
            <p>
              Step {currentStep + 1} of {config.steps.length}
            </p>
          </>
        )}
      </div>
    </>
  );
  
}

export default DynamicForm;
