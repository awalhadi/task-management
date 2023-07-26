import TaskForm from '@/Components/Task/TaskForm';
import TaskList from '@/Components/Task/TaskList';
import useToastNotify from '@/Components/hooks/useToastNotify';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ auth, res, flash }) {
    const {setFlash} = useToastNotify();
    useEffect(()=>{
        setFlash(flash);
    }, [flash?.message]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <Head title="Dashboard" />
            <ToastContainer />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome to, Task Management System</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Task Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TaskList />
                    <TaskForm oldTask={res?.task} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
