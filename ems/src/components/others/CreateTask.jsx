import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!userData) return;

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };

    const updatedEmployees = userData.map((emp) => {
      if (emp.firstName.toLowerCase() === assignTo.trim().toLowerCase()) {
        return {
          ...emp,
          tasks: [...emp.tasks, newTask],
          taskNumbers: {
            ...emp.taskNumbers,
            newTask: emp.taskNumbers.newTask + 1,
          },
        };
      }

      return emp;
    });

    
    setUserData(updatedEmployees);

    
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser?.role === "employee") {
      const updatedEmployee = updatedEmployees.find(
        (emp) => emp.email === loggedInUser.data.email
      );

      if (updatedEmployee) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employee",
            data: updatedEmployee,
          })
        );
      }
    }

    
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");

    alert("Task created successfully!");
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI Design"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              type="date"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">Assign To</h3>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              type="text"
              placeholder="Employee Name"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-1">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border border-gray-400 mb-4"
              type="text"
              placeholder="Design, Development, Testing..."
              required
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-1">Description</h3>

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border border-gray-400"
            placeholder="Enter task description..."
            required
          />

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 py-3 px-5 rounded text-sm mt-4 w-full"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;