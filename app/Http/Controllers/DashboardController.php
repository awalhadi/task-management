<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class DashboardController extends Controller
{
    public $taskService;
    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }


    public function dashboard(Request $request)
    {
        $users = User::select('name', 'id')->latest()->get();
        $tasks = $this->taskService->getLatest();
        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }
}
