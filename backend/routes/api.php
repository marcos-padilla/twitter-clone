<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/sign-up', [AuthController::class, 'signUp']);
Route::post('/sign-in', [AuthController::class, 'signIn']);
Route::middleware('auth:sanctum')->group(function () {
     Route::post('/sign-out', [AuthController::class, 'signOut']);

     Route::apiResource('/posts', PostController::class);
     Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
     Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy']);
     Route::post('/posts/{post}/like', [PostController::class, 'like']);
     Route::post('/polls/{poll}/vote', [PollController::class, 'vote']);

     Route::post('/follow/{user}', [FollowController::class, 'follow']);
     Route::delete('/follow/{user}', [FollowController::class, 'unfollow']);
});
