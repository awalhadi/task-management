import React from 'react';

const TaskEditModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedTaskName">Task Name</label>
            <input type="text" id="editedTaskName" name="editedTaskName" className="border rounded-lg px-4 py-2 w-full" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditModal;
