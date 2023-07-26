import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const TaskEditModal = ({ closeModal, task }) => {
    const deadline = task?.deadline_at ? task?.deadline_at?.split(' ')[0] : null;
    const { data, setData, patch, errors, clearErrors } = useForm({
        id: task?.id,
        title: task?.title,
        description: task?.description,
        deadline_at: deadline,
    });

    const [isDisable, setDisable] = useState(true);

    const setStateData = (name, value = null) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        clearErrors(name);
        setStateData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("tasks.update", data?.id));
        closeModal();
    };

    useEffect(() => {
        if (data.deadline_at && data.description && data.title) {
            setDisable(false);
        }
    }, [data]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/4">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={data.title}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-2 w-full"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="3"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="deadline"
                        >
                            Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline_at"
                            id="deadline"
                            value={data.deadline_at}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        {errors.deadline_at && (
                            <p className="text-red-500 text-sm">
                                {errors.deadline_at}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isDisable}
                            className={`${
                                isDisable
                                    ? "bg-gray-700 text-white hover:bg-gray-600"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                            }  px-4 py-2 ml-3 rounded`}
                        >
                            Save change
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskEditModal;
