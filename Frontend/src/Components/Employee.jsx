import React, { useState, useEffect } from "react";

const defaultImgSrc = "/src/assets/image_placeholder.png";

const initialFieldValues = {
  employeeId: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImgSrc,
  imageFile: null,
};

export default function Employee() {
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <p className="lead text-center">An Employee</p>
      </div>
      <form autoComplete="off" noValidate>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body">
            <div className="form-group ">
              <input
                className="form-control-file"
                type="file"
                accept="image/*"
              />
            </div>
          </div>
          <div className="card-body">
            <div className="form-group my-3">
              <input
                className="form-control"
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group my-3">
              <input
                className="form-control"
                placeholder="Employee Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
