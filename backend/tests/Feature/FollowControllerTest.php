<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class FollowControllerTest extends TestCase
{
    use DatabaseTransactions;


    /**
     * Test follow method.
     */
    public function test_user_can_follow_another_user(): void
    {
        $user = User::factory()->create();
        $authUser = User::factory()->create();

        $response = $this->actingAs($authUser)
            ->postJson(route('users.follow', [
                'user' => $user->id
            ]));

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'You are now following ' . $user->username,
            ]);
        /* $this->assertTrue($authUser->isFollowing($user)); */
        $this->assertDatabaseHas('follows', [
            'user_id' => $authUser->id,
            'follows_id' => $user->id,
        ]);
    }

    /**
     * Test follow method when already following.
     */
    public function test_follow_already_following(): void
    {
        $user = User::factory()->create();
        $authUser = User::factory()->create();
        $authUser->follow($user);

        $response = $this->actingAs($authUser)
            ->post(route('users.follow', [
                'user' => $user->id
            ]));

        $response->assertStatus(409);
    }

    /**
     * Test unfollow method.
     */
    public function test_user_can_unfollow_another_user(): void
    {
        $user = User::factory()->create();
        $authUser = User::factory()->create();
        $authUser->follow($user);

        $response = $this->actingAs($authUser)
            ->deleteJson(route('users.unfollow', [
                'user' => $user->id
            ]));

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'You are no longer following ' . $user->username,
            ]);

        $this->assertDatabaseMissing('follows', [
            'user_id' => $authUser->id,
            'follows_id' => $user->id,
        ]);
    }

    /**
     * Test unfollow method when not following.
     */
    public function test_unfollow_not_following(): void
    {
        $user = User::factory()->create();
        $authUser = User::factory()->create();

        $response = $this->actingAs($authUser)
            ->deleteJson(route('users.unfollow', [
                'user' => $user->id
            ]));

        $response->assertStatus(409);
    }


    public function test_user_cannot_follow_themselves(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson(route('users.follow', [
                'user' => $user->id
            ]));

        $response->assertStatus(409)
            ->assertJson([
                'message' => "You can't follow yourself",
            ]);
    }

    public function test_user_cannot_unfollow_themselves(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->deleteJson(route('users.unfollow', [
                'user' => $user->id
            ]));

        $response->assertStatus(409)
            ->assertJson([
                'message' => "You can't unfollow yourself",
            ]);
    }
}
