<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\CreateRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getAllUsers(): JsonResponse
    {
        $users = DB::table('users as u')
            ->select(
                'u.id',
                'u.full_name',
                DB::raw('GROUP_CONCAT(DISTINCT r.name) as roles')
            )
            ->join('users_roles as ur', function($join) {
                $join->on('ur.user_id', 'u.id')
                    ->join('roles as r', 'r.id', 'ur.role_id');
            })
            ->groupBy(
                'u.id',
                'u.full_name'
            )
            ->orderBy('u.id', 'DESC')
            ->get()
            ->map(function ($item) {
                $item->roles = explode(',', $item->roles);
                return $item;
            });

        return response()->json($users, 200);
    }

    public function createUser(CreateRequest $req): JsonResponse
    {
        $validated = $req->validated();

        $user = User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email']
        ]);
        $user->roles()->attach($validated['roles']);

        return response()->json(['msg' => 'User Created'], 200);
    }
}
