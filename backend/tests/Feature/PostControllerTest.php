<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * Test the store method.
     *
     * @return void
     */
    public function test_can_create_post(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'everyone',
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);

        $response->assertStatus(201);
    }

    public function test_shcduled_at_must_be_after_now(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'everyone',
            'scheduled_at' => '2021-01-01 00:00:00',
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('scheduled_at');
    }

    public function test_reply_not_valid(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'invalid',
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('reply');
    }

    public function test_post_cannot_have_media_and_poll(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'everyone',
            'media' => [
                [
                    'type' => 'image',
                    'path' => 'https://example.com/image.png',
                ],
            ],
            'poll' => [
                'question' => 'This is a test poll',
                'options' => [
                    'Yes',
                    'No',
                ],
            ],
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Post cannot have media and poll',
        ]);
    }

    public function test_post_can_have_media(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'everyone',
            'media' => [
                [
                    'type' => 'image',
                    'path' => 'https://example.com/image.png',
                ],
            ],
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);
        $response->assertStatus(201);
        $response->assertJson([
            'content' => 'This is a test post',
            'reply' => 'everyone',
        ]);
        $this->assertDatabaseHas('media', [
            'path' => 'https://example.com/image.png',
        ]);
    }

    public function test_post_can_have_poll(): void
    {
        $user = User::factory()->create();
        $postData = [
            'content' => 'This is a test post',
            'reply' => 'everyone',
            'poll' => [
                'questions' => [
                    ["question" => 'Question 1'],
                    ["question" => 'Question 2'],
                    ["question" => 'Question 3'],
                ]
            ],
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts', $postData);
        $response->assertStatus(201);
        $response->assertJson([
            'content' => 'This is a test post',
            'reply' => 'everyone',
            'media' => [],
            'poll' => [
                'questions' => [
                    ["question" => 'Question 1'],
                    ["question" => 'Question 2'],
                    ["question" => 'Question 3'],
                ]
            ],
        ]);
        $this->assertDatabaseHas('polls', [
            'post_id' => $response->json('id'),
        ]);
    }
    public function test_can_show_post(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user)
            ->getJson('/api/posts/' . $post->id);

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $post->id,
            'user' => [
                'id' => $post->user->id,
            ],
            'media' => [],
            'poll' => null,
            'comments' => [],
        ]);
    }

    public function test_can_like_post(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/posts/' . $post->id . '/like');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Post liked successfully',
        ]);
    }

    public function test_can_unlike_post(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $post->likes()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)
            ->postJson('/api/posts/' . $post->id . '/like');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Post unliked successfully',
        ]);
    }
}
