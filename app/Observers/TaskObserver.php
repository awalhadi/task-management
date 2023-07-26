<?php

namespace App\Observers;

use App\Models\Task;

class TaskObserver
{
    public function deleting(Task $task)
    {
        // Remove all task assignees before the task is deleted
        $task->assignees()->delete();
    }
}
