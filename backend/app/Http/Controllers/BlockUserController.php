<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class BlockUserController extends Controller
{
    public function index(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();
        $blocks = $user->blockedUsers()->get();
        return response()->json($blocks);
    }

    public function store(Request $request, User $user)
    {
        if ($user->hasRole('admin')) {
            return response()->json(['message' => 'You cannot block an admin'], 422);
        }

        /**
         * @var \App\Models\User
         */
        $authUser = $request->user();

        if ($user->id === $authUser->id) {
            return response()->json(['message' => 'You cannot block yourself'], 422);
        }

        $authUser->blockedUsers()->attach($user);
        return response()->json(['message' => 'User blocked']);
    }

    public function destroy(Request $request, User $user)
    {
        /**
         * @var \App\Models\User
         */
        $authUser = $request->user();
        $authUser->blockedUsers()->detach($user);
        return response()->json(['message' => 'User unblocked']);
    }
}
