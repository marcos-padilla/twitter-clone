<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SettingControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test updating the setting.
     *
     * @return void
     */
    public function test_user_can_update_settings(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->put('/api/settings', [
            'private' => true,
            'theme' => 'dark',
            'language' => 'en',
        ]);
        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Setting updated successfully',
        ]);
        $this->assertDatabaseHas('settings', [
            'user_id' => $user->id,
            'private' => true,
            'theme' => 'dark',
            'language' => 'en',
        ]);
    }

    public function test_user_cannot_update_settings_with_invalid_data(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->putJson('/api/settings', [
            'private' => 'invalid',
            'theme' => 'invalid',
            'language' => 'invalid',
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'private',
            'theme',
            'language',
        ]);
    }

    /**
     * Test retrieving the user's settings.
     *
     * @return void
     */
    public function test_user_can_retrieve_settings(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/settings');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'private',
                'theme',
                'language',
            ],
        ]);
    }
}
