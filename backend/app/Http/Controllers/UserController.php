<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();
        $posts = $user->posts()->orderBy('is_pinned', 'desc')->get();
        return response()->json([
            'user' => $user,
            'posts' => $posts
        ]);
    }

    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        $posts = $user->posts()->orderBy('is_pinned', 'desc')->get();
        return response()->json([
            'user' => $user,
            'posts' => $posts
        ]);
    }

    public function update(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'string|max:255',
            'username' => [
                'string',
                'max:20',
                Rule::unique('users', 'username')->ignore($request->user()->id)
            ],
            'email' => [
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($request->user()->id)
            ],
        ]);

        $user = $request->user();
        $user->update($attributes);
        return response()->json($user);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'image' => 'image|max:1024'
        ]);

        /** @var \App\Models\User */
        $user = auth()->user();
        if ($user->image_path) {
            Storage::disk('public')->delete($user->image_path);
        }

        if (!$request->hasFile('image')) {
            $user->update([
                'avatar_path' => null,
                'user' => $user
            ]);

            return response()->json([
                'message' => 'Avatar deleted'
            ]);
        }

        $file = $request->file('image');
        $name = $file->getClientOriginalName();
        $url = null;

        $storage =  Storage::disk('public')->put($name, $file);
        $url = asset('storage/' . $storage);

        $user->update([
            'avatar_path' => $url
        ]);

        return response()->json([
            'message' => 'Avatar updated',
            'user' => $user
        ]);
    }
}
