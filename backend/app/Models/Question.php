<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id',
        'question',
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }
}
