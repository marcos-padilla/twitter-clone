<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request, User $user)
    {
        /**
         * @var \App\Models\User
         */
        $authUser = $request->user();

        if ($authUser->id === $user->id) {
            return response(['message' => "You can't follow yourself"], 409);
        }

        if ($authUser->isFollowing($user)) {
            return response(null, 409);
        }

        $authUser->follow($user);
        return response()->json([
            'message' => 'You are now following ' . $user->username,
        ], 200);
    }

    public function unfollow(Request $request, User $user)
    {
        /**
         * @var \App\Models\User
         */
        $authUser = $request->user();

        if ($authUser->id === $user->id) {
            return response(['message' => "You can't unfollow yourself"], 409);
        }

        if (!$authUser->isFollowing($user)) {
            return response(null, 409);
        }

        $authUser->unfollow($user);
        return response()->json([
            'message' => 'You are no longer following ' . $user->username,
        ]);
    }
}
