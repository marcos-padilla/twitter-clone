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
          ];

          $response = $this->actingAs($user)->postJson('/api/roles', $roleData);
          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Role created successfully',
               'role' => [
                    'name' => $roleData['name'],
               ],
          ]);

          $this->assertDatabaseHas('roles', $roleData);
     }

     public function test_cannot_create_role_with_existing_name(): void
     {
          $user = User::factory()->create();
          $user->roles()->attach(Role::where('name', 'admin')->first());

          $existingRole = Role::factory()->create();

          $roleData = [
               'name' => $existingRole->name,
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
          ];

          $response = $this->actingAs($user)->postJson('/api/roles', $roleData);
          $response->assertStatus(403);
          $response->assertJson([
               'message' => 'You do not have permission to create a role'
          ]);
     }
}
