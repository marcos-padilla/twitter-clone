<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
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
        $return_post = Post::with(['user', 'media', 'poll.questions'])->find($post->id);

        return response()->json($return_post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
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
}
