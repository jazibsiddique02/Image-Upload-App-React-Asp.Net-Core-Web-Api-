import { useState } from "react";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";

function App() {
  return (
    <>
      <div className="container">
        <EmployeeList />
      </div>
    </>
  );
}

export default App;
