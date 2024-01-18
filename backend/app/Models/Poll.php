<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'question',
    ];

    protected $append = [
        'questions'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function getQuestionsAttribute()
    {
        return $this->questions()->get();
    }
}
