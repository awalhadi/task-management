<?php

namespace App\Http\Controllers\Task;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\TaskService;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaskAssignRequest;

class TaskController extends Controller
{
    public $taskService;
    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index()
    {
        $tasks = $this->taskService->getLatest();
        return Inertia::render('Welcome', [
            'tasks' => $tasks,
        ]);
    }

    public function store(TaskRequest $request)
    {
        $res = $this->taskService->createTask($request->all());
        return back()->with('message', $res);
    }


    public function update(TaskRequest $request, Task $task)
    {
        $res = $this->taskService->updateTask($task, $request->all());
        return back()->with('message', $res);
    }

    public function destroy(Task $task)
    {
        $res = $this->taskService->deleteTask($task);

        return back()->with('message', $res);
    }


    public function assign(TaskAssignRequest $request)
    {
        $res = $this->taskService->assign($request->all());

        return back()->with('message', $res);
    }
}
