import React from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaUser } from 'react-icons/fa';

const TaskList = ({ openEditModal, openAssignModal, openDeleteModal, tasks }) => {
    console.log("tasks:", tasks);
    return (
        <>
            <div className="w-1/2 mr-4">
                <div className="bg-white p-4 rounded shadow-lg h-4/5 overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Task List</h2>
                    <ul>
                        {tasks?.data && tasks?.data.length > 0 && tasks?.data.map((task) => (
                            <li
                                key={task.id}
                                className="py-3 border-b border-gray-300"
                            >
                                <div  className="flex items-center">
                                    <span className="text-lg">{task.title}</span>
                                    <span className="ml-2 text-gray-500 flex">
                                        <button
                                            className="cursor-pointer hover:text-blue-500 mr-3"
                                            onClick={() => openEditModal(task)}
                                        >
                                            <BsPencil />
                                        </button>
                                        <button
                                            className="fas fa-user-plus cursor-pointer hover:text-green-500 mr-3"
                                            onClick={() => openAssignModal(task)}
                                        >
                                            <BiSolidUserDetail />
                                        </button>

                                        <button
                                            className="fas fa-user-plus cursor-pointer hover:text-purple-500 "
                                            onClick={() => openDeleteModal(task)}
                                        >
                                            <BsTrash />
                                        </button>
                                    </span>

                                </div>
                                <div className="flex">
                                    <p className="font-bold">Assigned users:</p>
                                    {task.assignees_users?.length > 0 && task.assignees_users.map((assignee) => (
                                    <span key={`user-${assignee.id}`} className={`px-2 py-1 rounded-full ${
                                        assignee ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                      } mr-2 flex items-center`}>
                                        <FaUser className="mr-1" />
                                        <span className=" text-sm">{assignee?.name}</span>

                                    </span>
                                     ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TaskList;
