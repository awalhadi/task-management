import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const TaskDelete = ({ closeModal, task }) => {
    const deadline = task?.deadline_at ? task?.deadline_at?.split(' ')[0] : null;
    const { data, delete:deleteMethod } = useForm({
        id: task?.id,
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        deleteMethod(route("tasks.destroy", task?.id));
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Are you sure to delete Task?</h2>
                    <p className="mb-6">{task?.title}</p>
                <form onSubmit={handleSubmit}>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                            onClick={closeModal}
                        >
                            No
                        </button>
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 ml-3 rounded`}
                        >
                            Yes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskDelete;
