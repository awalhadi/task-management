<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use App\Models\TaskAssignee;
use App\Notifications\TaskAssigned;
use Illuminate\Support\Facades\Auth;
use App\Services\Response\ResponseService;
use Illuminate\Support\Facades\Notification;

class TaskService
{
    protected $task;
    protected $model;
    public $response;

    public function __construct(Task $model)
    {
        $this->model = $model;
        $this->response  = new ResponseService();
    }

    // Task query handler - returns the initial query builder
    protected function initialQuery()
    {
        $query = $this->model::latest();

        return $query;
    }

    // Get latest tasks for the authenticated user
    public function getLatest()
    {
        $user = auth()->user();

        // Retrieve tasks along with their assigneesUsers and assignees' users
        return $this->initialQuery()->with(['assignees', 'assigneesUsers'])
            ->where('user_id', $user->id)
            ->orWhereHas('assignees', function ($query) use ($user) {
                $query->where('assignee_id', $user->id);
            })
            ->paginate(10);
    }

    // Get tasks for the authenticated user
    public function authUserTasks()
    {
        $tasks = $this->getLatest();

        return [
            'tasks'    => $tasks,
        ];
    }
    // task query handler



    // task CRUD handler
    public function createTask(array $data)
    {
        try {
            $task = Task::create([
                'title'       => $data['title'],
                'user_id'     => Auth::id(),
                'description' => $data['description'],
                'deadline_at' => $data['deadline_at'],
            ]);

            $res    = $this->response->withSuccess('Task added successfully', $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed('Task added failed');

            return $res;
        }
    }

    public function updateTask(Task $task, array $data)
    {
        try {
            $task->title       = $data['title'];
            $task->description = $data['description'];
            // $task->user_id     = Auth::id();
            $task->deadline_at = $data['deadline_at'];
            $task->save();

            $res                = $this->response->withSuccess('Task update success', $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed('Task update failed');

            return $res;
        }
    }

    public function deleteTask(Task $task)
    {
        try {
            $task->delete();
            $res = $this->response->withSuccess('Task delete success', $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed('Task delate failed');

            return $res;
        }
    }

    public function assign(array $data)
    {
        try {
            $task = $this->model::where('id', $data['task_id'])->first();
            $user = User::where('id', $data['assignee_id'])->first();

            if (!$task->assignees()->where('assignee_id', $data['assignee_id'])->exists()) {
                // If the user is not already assigned to the task, assign them
                $task->assignees()->create(['assignee_id' => $data['assignee_id']]);

                $res = $this->response->withSuccess('Task assign success', $task);

                // send email notification to the assigned user here
                // $user->notify(new TaskAssigned($task));
                Notification::send($user, new TaskAssigned($task));

                return $res;
            } else {
                // If the user is already assigned to the task, return a success response
                $res = $this->response->withSuccess('Already assigned', $task);

                return $res;
            }
        } catch (\Exception $ex) {
            $res = $this->response->withFailed('Task assign failed');

            return $res;
        }
    }
}
