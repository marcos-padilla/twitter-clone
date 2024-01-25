<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BlockUserControllerTest extends TestCase
{
     use DatabaseTransactions;

     public function test_admin_cannot_be_blocked(): void
     {
          $admin = User::factory()->create();
          $admin->roles()->attach(Role::where('name', 'admin')->first()->id);
          $user = User::factory()->create();

          $response = $this->actingAs($user)
               ->postJson('/api/block-users/' . $admin->id);

          $response->assertStatus(422);
          $response->assertJson(['message' => 'You cannot block an admin']);
     }

     public function test_user_cannot_block_themselves(): void
     {
          $user = User::factory()->create();

          $response = $this->actingAs($user)
               ->postJson('/api/block-users/' . $user->id);

          $response->assertStatus(422);
          $response->assertJson(['message' => 'You cannot block yourself']);
     }

     public function test_user_can_block_another_user(): void
     {
          $authUser = User::factory()->create();
          $user = User::factory()->create();

          $response = $this->actingAs($authUser)
               ->postJson('/api/block-users/' . $user->id);

          $response->assertStatus(200);
          $response->assertJson(['message' => 'User blocked']);

          $this->assertDatabaseHas('blocks', [
               'user_id' => $authUser->id,
               'blocked_user_id' => $user->id,
          ]);
     }

     public function test_user_can_unblock_another_user(): void
     {
          $authUser = User::factory()->create();
          $user = User::factory()->create();

          $authUser->blockedUsers()->attach($user);

          $response = $this->actingAs($authUser)
               ->deleteJson('/api/block-users/' . $user->id);

          $response->assertStatus(200);
          $response->assertJson(['message' => 'User unblocked']);

          $this->assertDatabaseMissing('blocks', [
               'user_id' => $authUser->id,
               'blocked_user_id' => $user->id,
          ]);
     }
}
