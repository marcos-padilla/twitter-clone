<?php

namespace Tests\Feature;

use App\Models\Poll;
use App\Models\Question;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PollControllerTest extends TestCase
{

    use DatabaseTransactions;

    public function test_user_can_vote(): void
    {
        $user = User::factory()->create();
        $poll = Poll::factory()->create();

        $question = Question::factory()->create([
            'poll_id' => $poll->id,
        ]);

        $response = $this->actingAs($user)
            ->post("/api/polls/$poll->id/vote", [
                'question_id' => $question->id,
            ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Voted successfully',
        ]);

        $response->assertJson([
            'message' => 'Voted successfully',
            'poll' => $poll->toArray(),
        ]);

        $this->assertDatabaseHas('votes', [
            'user_id' => $user->id,
            'question_id' => $question->id,
        ]);
    }

    public function test_user_cannot_have_2_votes_in_same_poll(): void
    {
        $user = User::factory()->create();
        $poll = Poll::factory()->create();
        $question1 = Question::factory()->create([
            'poll_id' => $poll->id,
        ]);
        $question2 = Question::factory()->create([
            'poll_id' => $poll->id,
        ]);

        $this->actingAs($user)
            ->postJson("/api/polls/$poll->id/vote", [
                'question_id' => $question1->id,
            ]);

        $response = $this->actingAs($user)->postJson("/api/polls/$poll->id/vote", [
            'question_id' => $question2->id,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Voted successfully',
        ]);

        $this->assertDatabaseHas('votes', [
            'user_id' => $user->id,
            'question_id' => $question2->id,
        ]);

        $this->assertDatabaseMissing('votes', [
            'user_id' => $user->id,
            'question_id' => $question1->id,
        ]);

        $this->assertEquals(1, $poll->votes()->count());
    }
}
