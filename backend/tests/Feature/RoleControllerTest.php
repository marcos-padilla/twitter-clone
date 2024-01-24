<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RoleControllerTest extends TestCase
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
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
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
               'permissions' => [
                    'create-role',
                    'assign-role'
               ]
          ];

          $response = $this->actingAs($user)->putJson('/api/roles/' . $role->id, $roleData);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You cannot update the admin role'
          ]);
     }

     public function test_can_delete_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::factory()->create();

          $response = $this->actingAs($user)->deleteJson('/api/roles/' . $role->id);
          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Role deleted successfully',
          ]);

          $this->assertDatabaseMissing('roles', [
               'id' => $role->id,
          ]);
     }

     public function test_cannot_delete_role_without_permission(): void
     {
          $user = User::factory()->create();
          $role = Role::factory()->create();

          $response = $this->actingAs($user)->deleteJson('/api/roles/' . $role->id);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You do not have permission to delete a role'
          ]);
     }

     public function test_cannot_delete_admin_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::where('name', 'admin')->first();

          $response = $this->actingAs($user)->deleteJson('/api/roles/' . $role->id);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You cannot delete the admin role'
          ]);
     }

     public function test_cannot_delete_unexisting_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $response = $this->actingAs($user)->deleteJson('/api/roles/999');

          $response->assertStatus(404);
     }

     public function test_can_assign_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::factory()->create();

          $requestData = [
               'user_id' => $user->id,
          ];

          $response = $this->actingAs($user)->postJson('/api/roles/' . $role->id . '/assign', $requestData);

          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Role assigned successfully',
          ]);

          $this->assertDatabaseHas('role_user', [
               'role_id' => $role->id,
               'user_id' => $user->id,
          ]);
     }

     public function test_cannot_assign_role_without_permission(): void
     {
          $user = User::factory()->create();
          $role = Role::factory()->create();

          $requestData = [
               'user_id' => $user->id,
          ];

          $response = $this->actingAs($user)->postJson('/api/roles/' . $role->id . '/assign', $requestData);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You do not have permission to assign a role',
          ]);

          $this->assertDatabaseMissing('role_user', [
               'role_id' => $role->id,
               'user_id' => $user->id,
          ]);
     }

     public function test_cannot_assign_role_to_non_existing_user(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $role = Role::factory()->create();

          $requestData = [
               'user_id' => -1, // Non-existing user ID
          ];

          $response = $this->actingAs($user)->postJson('/api/roles/' . $role->id . '/assign', $requestData);

          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['user_id']);

          $this->assertDatabaseMissing('role_user', [
               'role_id' => $role->id,
               'user_id' => $requestData['user_id'],
          ]);
     }

     public function test_cannot_assign_admin_role(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $user2 = User::factory()->create();
          $role = Role::where('name', 'admin')->first();

          $requestData = [
               'user_id' => $user2->id,
          ];

          $response = $this->actingAs($user)->postJson('/api/roles/' . $role->id . '/assign', $requestData);

          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You cannot assign the admin role',
          ]);

          $this->assertDatabaseMissing('role_user', [
               'role_id' => $role->id,
               'user_id' => $requestData['user_id'],
          ]);
     }
}
