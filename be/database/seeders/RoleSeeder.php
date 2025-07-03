<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        Role::query()->firstOrcreate(['name' => 'Author']);
        Role::query()->firstOrcreate(['name' => 'Editor']);
        Role::query()->firstOrcreate(['name' => 'Subscriber']);
        Role::query()->firstOrcreate(['name' => 'Administrator']);
    }
}
