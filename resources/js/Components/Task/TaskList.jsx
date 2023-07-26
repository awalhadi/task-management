import React from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { BiShowAlt, BiSolidUserDetail } from 'react-icons/bi';

const TaskList = ({ openEditModal, openAssignModal }) => {
    const tasks = [
        { id: 1, name: 'Sample Task 1' },
        { id: 2, name: 'Sample Task 2' },
        // Add more tasks here
      ];
  return (
    <>
      {/* <h2 className="text-xl font-bold mb-4">My Tasks Lists</h2>
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

      </ul> */}


<div className="w-1/2 mr-4">
      <div className="bg-white p-4 rounded shadow-lg h-64 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="py-3 border-b border-gray-300 flex items-center">
              <span className="text-lg">{task.name}</span>
              <span className="ml-2 text-gray-500 flex">
                <button
                  className="cursor-pointer hover:text-blue-500 mr-3"
                  onClick={openEditModal}
                >
                    <BsPencil />
                </button>
                <button
                  className="fas fa-user-plus cursor-pointer hover:text-green-500 mr-3"
                  onClick={openAssignModal}
                >
                    <BiSolidUserDetail />
                </button>

                <button
                  className="fas fa-user-plus cursor-pointer hover:text-purple-500 mr-3"
                  onClick={openAssignModal}
                >
                    <BiShowAlt />
                </button>

                <button
                  className="fas fa-user-plus cursor-pointer hover:text-purple-500 "
                  onClick={openAssignModal}
                >
                    <BsTrash />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default TaskList;
