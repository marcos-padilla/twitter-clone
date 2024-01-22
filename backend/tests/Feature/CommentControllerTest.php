<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_comment(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $commentData = [
            'comment' => 'This is a test comment',
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/posts/' . $post->id . '/comments', $commentData);

        $response->assertStatus(201);
        $response->assertJson([
            'comment' => 'This is a test comment',
        ]);
        $this->assertDatabaseHas('comments', [
            'comment' => 'This is a test comment',
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);
    }

    public function test_can_delete_comment(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'post_id' => $post->id,
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)
            ->deleteJson('/api/posts/' . $post->id . '/comments/' . $comment->id);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Comment deleted successfully',
        ]);
        $this->assertDatabaseMissing('comments', [
            'id' => $comment->id,
        ]);
    }

    public function test_cannot_delete_comment_if_not_authorized(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'post_id' => $post->id,
            'user_id' => $user1->id,
        ]);

        $response = $this->actingAs($user2)
            ->deleteJson('/api/posts/' . $post->id . '/comments/' . $comment->id);

        $response->assertStatus(403);
        $response->assertJson([
            'message' => 'You do not own this comment.',
        ]);
        $this->assertDatabaseHas('comments', [
            'id' => $comment->id,
        ]);
    }
}
