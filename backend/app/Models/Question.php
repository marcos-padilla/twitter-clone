<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id',
        'question',
    ];

    protected $appends = [
        'count_votes',
        'percentage_votes'
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function getCountVotesAttribute()
    {
        return $this->votes()->count();
    }

    /*  public function getPercentageVotesAttribute()
    {
        $poll_id = DB::table('polls')->where('id', $this->poll_id)->value('id');
        $questions = DB::table('questions')->where('poll_id', $poll_id)->get();
        $totalVotes = DB::table('votes')->whereIn('question_id', $questions->pluck('id'))->count();
        $percentageVotes = ($this->votes()->count() / $totalVotes) * 100;
        return $percentageVotes;
    } */

    public function getPercentageVotesAttribute()
    {
        $poll = $this->poll()->with('questions')->first();
        $totalVotes = $poll->questions->flatMap(function ($question) {
            return $question->votes;
        })->count();
        $percentageVotes = round(($this->votes()->count() / $totalVotes) * 100, 2);
        return $percentageVotes;
    }
}
