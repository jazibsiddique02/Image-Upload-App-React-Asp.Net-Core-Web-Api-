# Image-Upload-App-React-Asp.Net-Core-Web-Api

# 👨‍💼 Employee Image CRUD App (React + .NET Core)

A full-stack web application for employee registration using image upload. Built with **React** (Frontend) and **.NET Core Web API** (Backend), with **SQL Server** as the database.

---

## 🚀 Features

- 📸 Upload employee image
- 🧑‍💼 Register new employees with name, occupation & photo
- 📝 Update and delete employee records
- 📋 List all registered employees
- 💾 Image files stored locally in `Images/` folder in the backend
- 🗃️ Form data stored in SQL Server

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, Bootstrap
- **Backend**: ASP.NET Core Web API
- **Database**: SQL Server
- **File Storage**: Local `Images` directory in backend









## 🔧 Setup Instructions

After Cloning: Navigate To Backend folder in Visual Studio:

in the terminal, type dotnet restore to restore the nuget packages.
Open the appsettings.json file in the backend project and update the connection string to match your SQL Server instance.
Navigate to Tools > Nuget Package Manager > Package Manager Console from the top menu. Type update-database command to run the latest migration.This will setup database tables and their relationships.
Run the Project.


Navigate To Frontend Directory in vscode:

in the terminal , write npm i to install all dependencies.
then, type "npm run dev" to run vite development server.



![Image CRUD Project](https://github.com/user-attachments/assets/1062772a-1a0a-47cd-81ff-0d165a15f1d4)
