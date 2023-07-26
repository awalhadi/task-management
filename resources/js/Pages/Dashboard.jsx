import TaskDelete from "@/Components/Task/TaskDelete";
import TaskEditModal from "@/Components/Task/TaskEditModal";
import TaskForm from "@/Components/Task/TaskForm";
import TaskList from "@/Components/Task/TaskList";
import UserAssignModal from "@/Components/Task/UserAssignModal";
import useToastNotify from "@/Components/hooks/useToastNotify";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard({ auth, tasks, flash, users }) {
    const { setFlash } = useToastNotify();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const openEditModal = (task) => {
        setIsEditModalOpen(true);
        setSelectedTask(task);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const openAssignModal = (task) => {
        setIsAssignModalOpen(true);
        setSelectedTask(task);
    };
    const openDeleteModal = (task) => {
        setIsDeleteModalOpen(true);
        setSelectedTask(task);
    };

    const closeAssignModal = () => {
        setIsAssignModalOpen(false);
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };
    useEffect(() => {
        setFlash(flash);
    }, [flash?.message]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h6 className="font-semibold text-xl text-gray-800 leading-tight">
                        Welcome to, Task Management System
                    </h6>
                </>
            }
        >
            <Head title="Dashboard" />
            <ToastContainer />

            <div className="container mx-auto p-4 flex">
                {/* Task List */}
                <TaskList
                    openEditModal={openEditModal}
                    openAssignModal={openAssignModal}
                    openDeleteModal={openDeleteModal}
                    tasks={tasks}
                />

                {/* Task Input Form */}

                <TaskForm />

                {/* Task Edit Modal */}
                {isEditModalOpen && (
                    <TaskEditModal closeModal={closeEditModal} task={selectedTask} />
                )}

                {/* User Assign Modal */}
                {isAssignModalOpen && (
                    <UserAssignModal closeModal={closeAssignModal} users={users} task={selectedTask} />
                )}

                {/* Delete Modal */}
                {isDeleteModalOpen && (
                    <TaskDelete closeModal={closeDeleteModal} task={selectedTask} />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
