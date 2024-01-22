<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Http\Requests\StorePollRequest;
use App\Http\Requests\UpdatePollRequest;
use Illuminate\Http\Request;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePollRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Poll $poll)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Poll $poll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePollRequest $request, Poll $poll)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Poll $poll)
    {
        //
    }

    public function vote(Request $request, Poll $poll)
    {
        $request->validate([
            'question_id' => 'required|integer|exists:questions,id',
        ]);

        /**
         * @var \App\Models\User $user
         */
        $user = $request->user();

        $existingVote = $poll->votes()->where('user_id', $user->id)->first();
        if ($existingVote) {
            $existingVote->update([
                'question_id' => $request->question_id,
            ]);
        } else {
            $poll->votes()->create([
                'user_id' => $user->id,
                'question_id' => $request->question_id,
            ]);
        }

        return response()->json([
            'message' => 'Voted successfully',
            'poll' => $poll->load('questions'),
        ]);
    }
}
