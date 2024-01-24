<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create-role',
            'assign-role',
            'delete-role',
            'ban-user',
            'unban-user',
            'delete-post',
        ];
        /**
         * @var Role $adminRole
         */
        $adminRole = Role::create([
            'name' => 'admin'
        ]);

        foreach ($permissions as $permission) {
            $created_permission = Permission::create([
                'name' => $permission
            ]);
            $adminRole->permissions()->attach($created_permission);
        }

        $moderatorRole = Role::create([
            'name' => 'moderator'
        ]);

        $permissions = [
            'delete-post',
            'ban-user',
            'unban-user',
        ];

        foreach ($permissions as $permission) {
            $moderatorRole->permissions()->attach(Permission::where('name', $permission)->first());
        }
    }
}
