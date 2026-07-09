import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FaildTask from "./FaildTask";

const TaskList = ({ data }) => {
  if (!data?.tasks || data.tasks.length === 0) {
    return (
      <div className="text-white text-xl mt-10">
        No tasks available.
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center gap-5 flex-nowrap w-full py-5 mt-10"
    >
      {data.tasks.map((task, index) => {
        if (task.active) {
          return <AcceptTask key={index} data={task} />;
        }

        if (task.newTask) {
          return <NewTask key={index} data={task} />;
        }

        if (task.completed) {
          return <CompleteTask key={index} data={task} />;
        }

        if (task.failed) {
          return <FaildTask key={index} data={task} />;
        }

        return null;
      })}
    </div>
  );
};

export default TaskList;