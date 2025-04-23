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

export default function Employee(props) {
  const { addOrEdit } = props;
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target; // name contains input field title : for eg.: employeeName,occupation,imageName,etc., value contains whatever is entered into the field: for eg.: John,developer,etc.

    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImgSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImgSrc ? false : true;
    temp.occupation = values.occupation == "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true); // returns an iterate-able object containing all values inside temp.every function is used for iterating all values inside temp.
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
    document.getElementById("image-uploader").value = null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeId", values.employeeId);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);

      // // Your logging attempt (based on your description)
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : ""; // invalid-field class is defined in index.css. this class is used for validating form.

  return (
    <>
      <div className="container">
        <p className="lead text-center">An Employee</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} height={300} className="card-img-top" />
          <div className="card-body">
            <div className="form-group ">
              <input
                className={"form-control-file" + applyErrorClass("imageSrc")}
                type="file"
                accept="image/*"
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
          </div>
          <div className="card-body">
            <div className="form-group my-3">
              <input
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group my-3">
              <input
                className={"form-control" + applyErrorClass("occupation")}
                placeholder="Employee Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-center">
              <button
                className="btn fw-bold"
                style={{ backgroundColor: "#dedada" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
