<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct()
    {
    }

    public function signUp(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:20|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
        ]);

        /** @var \App\Models\User */
        $user = User::create($attributes);
        return response()->json($user, 201);
    }

    public function signIn(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ]);


        if (Auth::attempt($credentials)) {
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
