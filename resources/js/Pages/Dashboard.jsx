import TaskEditModal from '@/Components/Task/TaskEditModal';
import TaskForm from '@/Components/Task/TaskForm';
import TaskList from '@/Components/Task/TaskList';
import UserAssignModal from '@/Components/Task/UserAssignModal';
import useToastNotify from '@/Components/hooks/useToastNotify';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ auth, res, flash }) {
    const {setFlash} = useToastNotify();

    // State to manage the display of modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
  };

    useEffect(()=>{
        setFlash(flash);
    }, [flash?.message]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<>
            <h6 className="font-semibold text-xl text-gray-800 leading-tight">Welcome to, Task Management System</h6>
            </>}
        >

            <Head title="Dashboard" />
            <ToastContainer />


<div className="container mx-auto p-4 flex">
      {/* Task List */}
      <TaskList
        openEditModal={openEditModal}
        openAssignModal={openAssignModal}
      />

        {/* Task Input Form */}

            <TaskForm />

      {/* Task Edit Modal */}
      {isEditModalOpen && (
        <TaskEditModal closeModal={closeEditModal} />
      )}

      {/* User Assign Modal */}
      {isAssignModalOpen && (
        <UserAssignModal closeModal={closeAssignModal} />
      )}
    </div>
        </AuthenticatedLayout>
    );
}
