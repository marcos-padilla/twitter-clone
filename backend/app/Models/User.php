<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'avatar_path',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    protected $appends = [
        'count_following',
        'count_followers',
        'is_following'
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'user_id', 'follows_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'follows_id', 'user_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function isFollowing(User $user): bool
    {
        return $this->following->contains($user);
    }

    public function follow(User $user)
    {
        return $this->following()->save($user);
    }

    public function unfollow(User $user)
    {
        return $this->following()->detach($user);
    }

    public function getCountFollowingAttribute()
    {
        return $this->following()->count();
    }

    public function getCountFollowersAttribute()
    {
        return $this->followers()->count();
    }

    public function getIsFollowingAttribute()
    {
        if (auth()->check()) {
            return DB::table('follows')->where('user_id', auth()->user()->id)->where('follows_id', $this->id)->exists();
        }
        return false;
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'from_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'to_id');
    }

    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasPermission($permission)
    {
        return $this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('name', $permission);
        })->exists();
    }
}
