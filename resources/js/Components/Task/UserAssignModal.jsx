import { useForm } from '@inertiajs/react';
import React from 'react';

const UserAssignModal = ({ closeModal, users, task }) => {

    const { data, post, setData, clearErrors, errors } = useForm({
        task_id: task?.id,
        assignee_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        clearErrors(name);
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.assign"));
        closeModal();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <h2 className="text-xl font-semibold mb-4">Assign User</h2>
        <p className='mb-4'>{task?.title}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedUser">Select User</label>
            <select id="assignee_id" onChange={handleChange} name="assignee_id" className="border rounded-lg px-4 py-2 w-full">
              {users && users.length>0 && users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {errors.assignee_id && <p className="text-red-500 text-sm">{errors.assignee_id}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2">Assign</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAssignModal;
