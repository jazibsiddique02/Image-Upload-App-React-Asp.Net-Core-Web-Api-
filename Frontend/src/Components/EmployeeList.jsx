import React from "react";
import Employee from "./Employee";

const EmployeeList = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="jumbotron jumbotron-fluid py-4"
          style={{ backgroundColor: "#b7b6b6" }}
        >
          <div className="container">
            <h1 className="display-4 text-center">Fluid jumbotron</h1>
          </div>
        </div>
      </div>

      <div className="col-md-4 my-4">
        <Employee />
      </div>
      <div className="col-md-8 my-4">List of Employee Records</div>
    </div>
  );
};

export default EmployeeList;
