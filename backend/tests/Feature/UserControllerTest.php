<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
     use DatabaseTransactions;

     public function test_can_get_user_and_posts(): void
     {
          $user = User::factory()->create();
          $post1 = Post::factory()->create(['user_id' => $user->id]);
          $post2 = Post::factory()->create(['user_id' => $user->id]);

          $response = $this->actingAs($user)
               ->getJson(route('users.show-authenticated-user'));

          $response->assertStatus(200);
          $response->assertJson([
               'user' => [
                    'id' => $user->id,
               ],
               'posts' => [
                    [
                         'id' => $post1->id,
                         'user_id' => $user->id,
                    ],
                    [
                         'id' => $post2->id,
                         'user_id' => $user->id,
                    ],
               ],
          ]);
     }

     public function test_can_show_user_and_posts(): void
     {
          $authUser = User::factory()->create();
          $user = User::factory()->create();
          $post1 = Post::factory()->create(['user_id' => $user->id]);
          $post2 = Post::factory()->create(['user_id' => $user->id]);

          $response = $this->actingAs($authUser)
               ->getJson('/api/user/' . $user->username);

          $response->assertStatus(200);
          $response->assertJson([
               'user' => [
                    'id' => $user->id,
               ],
               'posts' => [
                    [
                         'id' => $post1->id,
                         'user_id' => $user->id,
                    ],
                    [
                         'id' => $post2->id,
                         'user_id' => $user->id,
                    ],
               ],
          ]);
     }

     public function test_can_update_user(): void
     {
          $user = User::factory()->create();

          $response = $this->actingAs($user)
               ->putJson('/api/user', [
                    'name' => 'John Doe',
                    'username' => 'johndoe',
                    'email' => 'johndoe@example.com',
               ]);

          $response->assertStatus(200);
          $response->assertJson([
               'name' => 'John Doe',
               'username' => 'johndoe',
               'email' => 'johndoe@example.com',
          ]);

          $this->assertDatabaseHas('users', [
               'id' => $user->id,
               'name' => 'John Doe',
               'username' => 'johndoe',
               'email' => 'johndoe@example.com',
          ]);
     }

     public function test_cannot_update_user_with_existing_username(): void
     {
          $user1 = User::factory()->create();
          $user2 = User::factory()->create();

          $response = $this->actingAs($user1)
               ->putJson('/api/user', [
                    'name' => 'John Doe',
                    'username' => $user2->username,
                    'email' => 'johndoe@example.com',
               ]);
          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['username']);
     }

     public function test_cannot_update_user_with_existing_email(): void
     {
          $user1 = User::factory()->create();
          $user2 = User::factory()->create();

          $response = $this->actingAs($user1)
               ->putJson('/api/user', [
                    'name' => 'John Doe',
                    'username' => 'johndoe',
                    'email' => $user2->email,
               ]);

          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['email']);
     }

     public function test_can_update_avatar(): void
     {
          Storage::fake('public');
          $user = User::factory()->create();
          $file = UploadedFile::fake()->image('avatar.jpg');

          $response = $this->actingAs($user)
               ->postJson('/api/user/avatar', [
                    'image' => $file,
               ]);

          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Avatar updated',
          ]);

          $this->assertDatabaseHas('users', [
               'id' => $user->id,
               'avatar_path' => 'http://localhost/storage/avatar.jpg/' . $file->hashName(),
          ]);
          /* Storage::disk('public')->assertExists($file->hashName()); */
     }

     public function test_can_delete_avatar(): void
     {
          Storage::fake('public');
          $user = User::factory()->create(['avatar_path' => 'http://localhost/storage/avatar.jpg']);

          $response = $this->actingAs($user)
               ->postJson('/api/user/avatar');

          $response->assertStatus(200);
          $response->assertJson([
               'message' => 'Avatar deleted',
          ]);

          $this->assertDatabaseHas('users', [
               'id' => $user->id,
               'avatar_path' => null,
          ]);
     }

     public function test_cannot_update_avatar_with_invalid_image(): void
     {
          Storage::fake('public');
          $user = User::factory()->create();
          $file = UploadedFile::fake()->create('document.pdf', 1024);

          $response = $this->actingAs($user)
               ->postJson('/api/user/avatar', [
                    'image' => $file,
               ]);

          $response->assertStatus(422);
          $response->assertJsonValidationErrors(['image']);
          $this->assertDatabaseMissing('users', [
               'id' => $user->id,
               'avatar_path' => $file->hashName(),
          ]);
     }
}
