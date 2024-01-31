<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Authentication Routes
Route::prefix('auth')->group(function () {
     Route::post('/signup', [AuthController::class, 'signUp'])->name('signup');
     Route::post('/signin', [AuthController::class, 'signIn'])->name('signin');
     Route::post('/signout', [AuthController::class, 'signOut'])->middleware('auth:sanctum')->name('signout');
});

Route::middleware('auth:sanctum')->group(function () {

     Route::get('/valid-token', [AuthController::class, 'validToken'])->name('valid-token');

     Route::prefix('user')->group(function () {
          //User Routes
          Route::get('/me', [UserController::class, 'showAuthenticatedUser'])->name('users.show-authenticated-user');
          Route::get('/{username}', [UserController::class, 'showByUsername'])->name('users.show-by-username');
          Route::put('/', [UserController::class, 'update'])->name('users.update');
          Route::post('/avatar', [UserController::class, 'updateAvatar'])->name('users.update-avatar');

          //Follow Routes
          Route::post('/{user}/follow/', [FollowController::class, 'follow'])->name('users.follow');
          Route::delete('/{user}/unfollow/', [FollowController::class, 'unfollow'])->name('users.unfollow');

          //Message Routes
          Route::post('/{user}/message', [MessageController::class, 'sendMessage'])->name('users.send-message');
          Route::get('/{user}/message', [MessageController::class, 'index'])->name('users.view-message');
     });

     //Post Routes
     Route::apiResource('/posts', PostController::class)->names([
          'index' => 'posts.index',
          'store' => 'posts.store',
          'show' => 'posts.show',
          'update' => 'posts.update',
          'destroy' => 'posts.destroy',
     ]);

     Route::prefix('posts')->group(function () {
          Route::post('/posts/{post}/like', [PostController::class, 'like'])->name('posts.like');

          //Comment Routes
          Route::post('/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
          Route::delete('/{post}/comments/{comment}', [CommentController::class, 'destroy'])->name('posts.comments.destroy');
     });

     //Poll Route
     Route::post('/polls/{poll}/vote', [PollController::class, 'vote'])->name('poll.vote');

     //Role Routes
     Route::apiResource('/roles', RoleController::class)->except(['index', 'show'])->names([
          'store' => 'roles.store',
          'update' => 'roles.update',
          'destroy' => 'roles.destroy',
     ]);
     Route::post('/roles/{role}/assign', [RoleController::class, 'assignRole'])->name('roles.assign');

     //Block User Routes
     Route::prefix('blocked-users')->group(function () {
          Route::get('/', [BlockUserController::class, 'index'])->name('blocked.index');
          Route::post('/{user}', [BlockUserController::class, 'store'])->name('blocked.store');
          Route::delete('/{user}', [BlockUserController::class, 'destroy'])->name('blocked.destroy');
     });

     //Settings Routes
     Route::prefix('settings')->group(function () {
          Route::get('/', [SettingController::class, 'show'])->name('settings.show');
          Route::put('/', [SettingController::class, 'update'])->name('settings.update');
     });
});
