<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{

    use DatabaseTransactions;
    /**
     * A basic feature test example.
     */
    public function test_can_register_user(): void
    {
        $response = $this->postJson(route('signup'), [
            'name' => 'Test User',
            'email' => 'test_from_phpunit@test.com',
            'username' => 'test_from_phpunit',
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
            'id',
            'count_following',
            'count_followers',
        ]);

        $response->assertJson([
            'name' => 'Test User',
            'email' => 'test_from_phpunit@test.com',
            'username' => 'test_from_phpunit',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test_from_phpunit@test.com',
            'username' => 'test_from_phpunit',
        ]);

        $id = $response->json('id');
        $this->assertDatabaseHas('settings', [
            'user_id' => $id,
        ]);
    }

    public function test_two_users_cannot_have_the_same_username(): void
    {
        $this->postJson(route('signup'), [
            'name' => 'Test User',
            'email' => 'test1@test.com',
            'username' => 'test',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson(route('signup'), [
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
        $this->postJson(route('signup'), [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'username' => 'test1',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->postJson(route('signup'), [
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
        $response = $this->postJson(route('signup'), [
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
        $response = $this->postJson(route('signup'), [
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
            'email' => 'test_from_phpunit@test.com',
            'password' => 'password',
            'username' => 'test_from_phpunit'
        ]);

        $response = $this->postJson(route('signin'), [
            'email' => 'test_from_phpunit@test.com',
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
        $response = $this->postJson(route('signin'), [
            'email' => 'test_from_phpunit@test.com',
            'password' => 'wrong_password'
        ]);

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Invalid Credentials'
        ]);
    }
}
