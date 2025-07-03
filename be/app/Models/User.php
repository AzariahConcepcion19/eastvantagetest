<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'full_name',
        'email'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'users_roles');
    }
}
