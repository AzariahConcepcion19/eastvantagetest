<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    public function getAllRoles(): JsonResponse
    {
        $roles = Role::select('id', 'name')->get();

        return response()->json($roles, 200);
    }
}
