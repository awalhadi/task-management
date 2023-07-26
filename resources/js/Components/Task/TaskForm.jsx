// src/components/TaskForm.js

import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const TaskForm = ({ oldTask }) => {

  const {
    data,
    setData,
    post,
} = useForm({
    title: '',
    description: '',
    deadline_at: '',
});

const setStateData = (name, value = null) => {
    setData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

  const handleChange = (e) => {
    const { name, value } = e.target;

        setStateData(name, value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldTask?.id) {
        // patch(route("admin.coupons.update", oldCoupon?.id));
    } else {
        post(route("tasks.store"));
    }
};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
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
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
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
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
            Assign to user
          </label>
          <select className="custom-select block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
