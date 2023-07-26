<?php

namespace App\Models;

use App\Models\TaskAssignee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'deadline_at', 'user_id'];

    /**
     * Get the user that owns the Task
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function assignees()
    {
        return $this->hasMany(TaskAssignee::class, 'task_id');
    }

    public function assigneesUsers()
    {
        return $this->belongsToMany(User::class, 'task_assignees', 'task_id', 'assignee_id');
    }
}
