<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Like;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['user', 'media', 'poll.questions'])->latest()->paginate(10);
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = $request->user()->posts()->create($request->validated());

        if ($request->has('poll') && $request->has('media')) {
            return response()->json([
                'message' => 'Post cannot have media and poll'
            ], 422);
        }

        if ($request->has('media')) {
            $post->media()->createMany($request->media);
        }

        if ($request->has('poll')) {
            $poll = $post->poll()->create($request->poll);
            $poll->questions()->createMany($request->poll['questions']);
        }
        $post->load(['user', 'media', 'poll.questions']);

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['user', 'media', 'poll.questions', 'comments.user']);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    public function like(Request $request, Post $post)
    {
        $user = $request->user();

        $existingLike = $post->likes()->where('user_id', $user->id)->first();

        if ($existingLike) {
            $existingLike->delete();
            $message = 'Post unliked successfully';
        } else {
            $like = new Like();
            $like->user_id = $user->id;
            $post->likes()->save($like);
            $message = 'Post liked successfully';
        }

        return response()->json([
            'message' => $message,
        ]);
    }
}
