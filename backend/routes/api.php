<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PermissionRoleController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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

     Route::get('/user', [UserController::class, 'me']);
     Route::get('/user/{username}', [UserController::class, 'show']);
     Route::put('/user', [UserController::class, 'update']);
     Route::post('/user/avatar', [UserController::class, 'updateAvatar']);

     Route::apiResource('/posts', PostController::class);
     Route::post('/posts/{post}/like', [PostController::class, 'like']);

     Route::post('/polls/{poll}/vote', [PollController::class, 'vote']);

     Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
     Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy']);

     Route::post('/follow/{user}', [FollowController::class, 'follow']);
     Route::delete('/follow/{user}', [FollowController::class, 'unfollow']);

     Route::post('/message/{user}', [MessageController::class, 'sendMessage']);
     Route::get('/message/{user}', [MessageController::class, 'index']);

     Route::post('/roles', [PermissionRoleController::class, 'createRole']);
     Route::put('/roles/{role}', [PermissionRoleController::class, 'updateRole']);
     Route::delete('/roles/{role}', [PermissionRoleController::class, 'destroyRole']);
});
