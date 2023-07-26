import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Tasks Lists</h2>
      <ul className="divide-y divide-gray-200">
        {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
                <li key={task.id} className="p-4 hover:bg-blue-50">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-gray-500">Deadline: {task.deadline}</p>
                </li>
            ))
        ) : (
            <p className='text-gray-400'>No task found!</p>
        )}

      </ul>
    </div>
  );
};

export default TaskList;
