<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use App\Services\Response\ResponseService;

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

    // task query handler
    protected function initialQuery()
    {
        $query = $this->model::latest();

        return $query;
    }

    public function getLatest()
    {
        return $this->initialQuery()->select('title', 'description', 'deadline_at')->with('created_by')->paginate(10);
    }

    public function getTaskIndexData()
    {
        $query = request()->task;

        if (isset($query) && strlen($query) > 0) {
            $tasks = $this->getTaskSearch($query);
        } else {
        }
        $tasks = $this->getLatest();

        return [
            'tasks'    => $tasks,
        ];
    }

    public function getTaskSearch($query)
    {
        $tasks = $this->initialQuery()->where('title', 'LIKE', "%{$query}%")->paginate(10);

        return $tasks;
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

            $res    = $this->response->withSuccess(trans('Task added successfully'), $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed(trans('Task added failed'));

            return $res;
        }
    }

    public function updateTask(Task $task, array $data)
    {
        // Validate and process the task update data
        try {
            $task->title        = $data['title'];
            $task->description  = $data['description'];
            $task->deadline_at  = $data['deadline_at'];
            $task->save();

            $res                = $this->response->withSuccess(trans('Update success'), $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed(trans('Update failed'));

            return $res;
        }
    }

    public function deleteCoupon(Task $task)
    {
        try {
            $task->delete();
            $res = $this->response->withSuccess(trans('Delete success'), $task);

            return $res;
        } catch (\Exception $ex) {
            $res = $this->response->withFailed(trans('Delate failed'));

            return $res;
        }
    }
}
