import React, { useContext, useEffect, useState } from "react";
import Login from "./components/temp/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const [userData] = useContext(AuthContext);

  useEffect(() => {
    if (!userData.length) return;

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) return;

    if (loggedInUser.role === "admin") {
      setUser(loggedInUser);
      return;
    }

    if (loggedInUser.role === "employee") {
      const employee = userData.find(
        (emp) => emp.email === loggedInUser.data.email
      );

      if (employee) {
        setLoggedInUserData(employee);
        setUser({
          role: "employee",
          data: employee,
        });

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employee",
            data: employee,
          })
        );
      }
    }
  }, [userData]);

  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      const admin = { role: "admin" };

      setUser(admin);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(admin)
      );

      return;
    }

    const employee = userData.find(
      (emp) =>
        emp.email === email &&
        emp.password === password
    );

    if (employee) {
      const employeeUser = {
        role: "employee",
        data: employee,
      };

      setUser(employeeUser);
      setLoggedInUserData(employee);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(employeeUser)
      );

      return;
    }

    alert("Invalid Email or Password");
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user.role === "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : (
        <EmployeeDashboard
          changeUser={setUser}
          data={loggedInUserData}
        />
      )}
    </>
  );
};

export default App;