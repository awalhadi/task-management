<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $users = User::select('name', 'id')->get();
        $auth_user_tasks =
        return Inertia::render('Welcome', [
            'users' => $users,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
