<?php

namespace Tests\Feature;

use App\Models\User;
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
        $response = $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'name',
            'email',
            'username',
            'created_at',
            'updated_at',
            'id'
        ]);

        $response->assertJson([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test',
        ]);
    }

    public function test_two_users_cannot_have_the_same_username(): void
    {
        $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test1@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson('/api/sign-up', [
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
        $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test1',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test2',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(422);
    }

    public function test_password_must_be_confirmed(): void
    {
        $response = $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test2',
            'password' => 'password',
            'password_confirmation' => 'other_password'
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_password_must_be_greater_than_8_characters(): void
    {
        $response = $this->postJson('/api/sign-up', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test2',
            'password' => '123',
            'password_confirmation' => '123'
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_can_sign_in_with_valid_credentials(): void
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'password',
            'username' => 'test'
        ]);

        $response = $this->postJson('/api/sign-in', [
            'email' => 'test@test.com',
            'password' => 'password'
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'name',
                'email',
                'username',
                'created_at',
                'updated_at',
                'id'
            ],
            'token'
        ]);
    }

    public function test_cannot_sign_in_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/sign-in', [
            'email' => 'test@test.com',
            'password' => 'wrong_password'
        ]);

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Invalid Credentials'
        ]);
    }

    /*   public function test_can_sign_out(): void
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'password',
            'username' => 'test'
        ]);;

        $this->postJson('/api/sign-in', [
            'email' => 'test@test.com',
            'password' => 'password'
        ]);
        $response = $this->actingAs($user)->postJson('/api/sign-out');
        $response->dd();
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Signed out'
        ]);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => User::class,
            'name' => 'test-token',
        ]);
    } */
}
