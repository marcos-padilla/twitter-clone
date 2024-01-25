<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MessageControllerTest extends TestCase
{

    use DatabaseTransactions;

    public function test_user_can_send_message(): void
    {
        $sender = User::factory()->create();
        $receiver = User::factory()->create();

        $response = $this->actingAs($sender)->postJson(route('users.send-message', [
            'user' => $receiver->id
        ]), [
            'message' => 'Hello World',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('messages', [
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => 'Hello World',
        ]);
    }

    public function test_user_can_see_all_messages_with_another_user(): void
    {
        $sender = User::factory()->create();
        $receiver = User::factory()->create();

        $this->actingAs($sender)->postJson(route('users.send-message', [
            'user' => $receiver->id
        ]), [
            'message' => 'Hello Reciever',
        ]);

        $this->actingAs($receiver)->postJson(route('users.send-message', [
            'user' => $sender->id
        ]), [
            'message' => 'Hello Sender',
        ]);

        $response = $this->actingAs($sender)->getJson(route('users.view-message', [
            'user' => $receiver->id
        ]));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'sender_id',
                    'receiver_id',
                    'message',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);

        $response->assertJson([
            'data' => [
                [
                    'sender_id' => $sender->id,
                    'receiver_id' => $receiver->id,
                    'message' => 'Hello Reciever',
                ],
                [
                    'sender_id' => $receiver->id,
                    'receiver_id' => $sender->id,
                    'message' => 'Hello Sender',
                ]
            ]
        ]);
    }
}
