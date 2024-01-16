<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_can_register_user(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'user' => [
                'name',
                'email',
                'username',
                'avatar_path',
                'created_at',
                'updated_at',
                'id'
            ],
            'message',
            'token'
        ]);

        $response->assertJson([
            'user' => [
                'name' => 'Test User',
                'email' => 'test@test.com',
                'username' => 'test',
                'avatar_path' => null,
            ],
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);
    }

    public function test_two_users_cannot_have_the_same_username(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test1@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test2@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(422);
    }

    public function test_two_users_cannot_have_the_same_email(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test1',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test2',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(422);
    }
}
