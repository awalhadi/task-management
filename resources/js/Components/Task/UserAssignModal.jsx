import React from 'react';

const UserAssignModal = ({ closeModal }) => {
  // Replace this sample data with actual users data from your backend or state management
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    // Add more users here
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Assign User</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedUser">Select User</label>
            <select id="assignedUser" name="assignedUser" className="border rounded-lg px-4 py-2 w-full">
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
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
