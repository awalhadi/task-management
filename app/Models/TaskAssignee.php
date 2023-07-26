<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskAssignee extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $table = 'task_assignees';
}
