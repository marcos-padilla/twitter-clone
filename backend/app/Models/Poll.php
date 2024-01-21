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

    protected $appends = [
        'questions',
        'user_selection',
        'count_votes'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function votes()
    {
        return $this->hasManyThrough(Vote::class, Question::class);
    }

    public function getUserSelectionAttribute()
    {
        $userSelection = $this->votes()->where('user_id', auth()->id())->first();
        if ($userSelection) {
            return $userSelection->question_id;
        } else {
            return -1;
        }
    }

    public function getQuestionsAttribute()
    {
        return $this->questions()->get();
    }

    public function getCountVotesAttribute()
    {
        return $this->votes()->count();
    }
}
