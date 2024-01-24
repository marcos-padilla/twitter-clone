<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct()
    {
    }

    public function signUp(SignUpRequest $request)
    {
        /** @var \App\Models\User */
        $user = User::create($request->validated());
        return response()->json($user, 201);
    }

    public function signIn(SignInRequest $request)
    {

        if (Auth::attempt($request->validated())) {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }
        return response(['message' => 'Invalid Credentials'], 401);
    }

    public function signOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Signed out']);
    }
}
