<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Comment;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'reply',
        'scheduled_at',
        'is_pinned',
        'is_sensitive',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'is_sensitive' => 'boolean',
    ];

    protected $appends = [
        'media',
        'count_comment',
        'count_like',
        'is_liked'
    ];

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function poll()
    {
        return $this->hasOne(Poll::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class);
    }

    public function getMediaAttribute()
    {
        return $this->media()->get();
    }

    public function getCountCommentAttribute()
    {
        return $this->comments()->count();
    }

    public function getCountLikeAttribute()
    {
        return $this->likes()->count();
    }

    public function getIsLikedAttribute()
    {
        return $this->likes()->where('user_id', auth()->user()->id)->exists();
    }
}
