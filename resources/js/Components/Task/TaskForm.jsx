// src/components/TaskForm.js

import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const TaskForm = ({ oldTask }) => {
    const { data, setData, post, errors, clearErrors, reset, recentlySuccessful } = useForm({
        title      : "",
        description: "",
        deadline_at: "",
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
        if (oldTask?.id) {
            // patch(route("admin.coupons.update", oldCoupon?.id));
        } else {
            post(route("tasks.store"));
        }
        console.log('recentlySuccessful:', recentlySuccessful);
        reset();
    };

    useEffect(()=>{
        if (data.deadline_at && data.description && data.title) {
            setDisable(false);
        }
    }, [data])

    return (
        <>
            <div className="w-1/2">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
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
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
                            {errors.deadline_at && <p className="text-red-500 text-sm">{errors.deadline_at}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isDisable}
                                className={`${isDisable ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}  px-4 py-2 rounded`}
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskForm;
