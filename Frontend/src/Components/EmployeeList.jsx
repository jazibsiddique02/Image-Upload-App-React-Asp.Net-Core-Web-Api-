import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import axios from "axios";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const employeeAPI = (url = "https://localhost:7165/api/Employee") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + id, updateRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  // adding an employee
  const addOrEdit = (formData, onSuccess) => {
    employeeAPI()
      .create(formData)
      .then((res) => {
        onSuccess();
        refreshEmployeeList(); // after storing data of new employee, employeeList is updated with this function
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  // retrieves all employees from db and stores them in employeeList array
  const refreshEmployeeList = () => {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setEmployeeList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const imageCard = (data) => {
    return (
      <div className="card">
        <img src={data.imageSrc} className="card-img-top rounded-circle" />

        <div className="card-body">
          <h5>{data.employeeName}</h5>
          <span>{data.occupation}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="jumbotron jumbotron-fluid py-4"
          style={{ backgroundColor: "#dedada" }}
        >
          <div className="container">
            <h1 className="display-4 text-center">Employee Registration</h1>
          </div>
        </div>
      </div>

      <div className="col-md-4 my-4">
        <Employee addOrEdit={addOrEdit} />
      </div>

      <div className="col-md-8 my-4">
        <table>
          <tbody>
            {
              //tr > 3 td
              [...Array(Math.ceil(employeeList.length / 3))] // creates an empty array,size will be according to how many rows are needed,then spreads the empty array to use map function on it
                .map((e, i) => (
                  <tr key={i}>
                    <td>{imageCard(employeeList[3 * i])}</td>
                    <td>
                      {employeeList[3 * i + 1]
                        ? imageCard(employeeList[3 * i + 1])
                        : null}
                    </td>
                    <td>
                      {employeeList[3 * i + 2]
                        ? imageCard(employeeList[3 * i + 2])
                        : null}
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
