<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/get-all-users', [UserController::class, 'getAllUsers']);
Route::get('/get-all-roles', [RoleController::class, 'getAllRoles']);
Route::post('/create-user', [UserController::class, 'createUser']);
