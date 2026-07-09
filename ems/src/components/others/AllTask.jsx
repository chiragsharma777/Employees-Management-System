import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const deleteTask = (employeeId, taskIndex) => {
    const updatedEmployees = userData.map((emp) => {
      if (emp.id === employeeId) {
        const deletedTask = emp.tasks[taskIndex];

        const updatedTasks = emp.tasks.filter(
          (_, index) => index !== taskIndex
        );

        const updatedTaskNumbers = {
          ...emp.taskNumbers,
        };

        if (deletedTask.active)
          updatedTaskNumbers.active = Math.max(
            0,
            updatedTaskNumbers.active - 1
          );

        if (deletedTask.newTask)
          updatedTaskNumbers.newTask = Math.max(
            0,
            updatedTaskNumbers.newTask - 1
          );

        if (deletedTask.completed)
          updatedTaskNumbers.completed = Math.max(
            0,
            updatedTaskNumbers.completed - 1
          );

        if (deletedTask.failed)
          updatedTaskNumbers.failed = Math.max(
            0,
            updatedTaskNumbers.failed - 1
          );

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumbers: updatedTaskNumbers,
        };
      }

      return emp;
    });

    setUserData(updatedEmployees);
    localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees)
    );

    alert("Task deleted successfully.");
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      <h2 className="text-2xl font-semibold mb-5">
        All Employee Tasks
      </h2>

      {userData.map((employee) => (
        <div
          key={employee.id}
          className="mb-8 border border-gray-700 rounded p-4"
        >
          <h3 className="text-xl font-bold text-emerald-400 mb-4">
            {employee.firstName}
          </h3>

          {employee.tasks.length === 0 ? (
            <p className="text-gray-400">No Tasks</p>
          ) : (
            employee.tasks.map((task, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded p-4 mb-3 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">
                    {task.taskTitle}
                  </h4>

                  <p className="text-sm text-gray-300">
                    {task.taskDescription}
                  </p>

                  <p className="text-sm mt-1">
                    <span className="font-semibold">
                      Category:
                    </span>{" "}
                    {task.category}
                  </p>

                  <p className="text-sm">
                    <span className="font-semibold">
                      Date:
                    </span>{" "}
                    {task.taskDate}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteTask(employee.id, index)
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default AllTask;