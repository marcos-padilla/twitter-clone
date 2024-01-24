<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PermissionRoleControllerTest extends TestCase
{
     use DatabaseTransactions;

     public function test_can_create_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $roleData = [
               'name' => 'Test Role',
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
          ];

          $response = $this->actingAs($user)->postJson('/api/roles', $roleData);
          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Role created successfully',
               'role' => [
                    'name' => $roleData['name'],
               ],
          ]);

          $this->assertDatabaseHas('roles', [
               'name' => $roleData['name'],
          ]);
     }

     public function test_cannot_create_role_with_existing_name(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $existingRole = Role::factory()->create();

          $roleData = [
               'name' => $existingRole->name,
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
          ];

          $response = $this->actingAs($user)->postJson('/api/roles', $roleData);

          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['name']);
     }

     public function test_user_cannot_create_role_without_permission(): void
     {
          $user = User::factory()->create();

          $roleData = [
               'name' => 'Test Role',
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
          ];

          $response = $this->actingAs($user)->postJson('/api/roles', $roleData);
          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You do not have permission to create a role'
          ]);
     }

     public function test_can_update_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::factory()->create();

          $roleData = [
               'name' => 'Updated Role',
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/' . $role->id, $roleData);
          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Role updated successfully',
               'role' => [
                    'name' => $roleData['name'],
               ],
          ]);

          $this->assertDatabaseHas('roles', [
               'name' => $roleData['name'],
          ]);
     }

     public function test_cannot_update_role_without_permission(): void
     {
          $user = User::factory()->create();
          $role = Role::factory()->create();

          $roleData = [
               'name' => 'Updated Role',
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/' . $role->id, $roleData);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You do not have permission to update a role'
          ]);
     }

     public function test_cannot_update_role_with_existing_name(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $existingRole = Role::factory()->create();
          $role = Role::factory()->create();

          $roleData = [
               'name' => $existingRole->name,
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/' . $role->id, $roleData);

          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['name']);
     }

     public function test_cannot_update_unexisting_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $roleData = [
               'name' => 'Updated Role',
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/999', $roleData);

          $response->assertStatus(404);
     }

     public function test_cannot_update_admin_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::where('name', 'admin')->first();

          $roleData = [
               'name' => 'Updated Role',
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/' . $role->id, $roleData);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You cannot update the admin role'
          ]);
     }
}
