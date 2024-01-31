<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
    ];

    protected $appends = [
        'sender',
        'receiver',
        'is_owner'
    ];


    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function getSenderAttribute()
    {
        return $this->sender()->first();
    }

    public function getReceiverAttribute()
    {
        return $this->receiver()->first();
    }

    public function getIsOwnerAttribute()
    {
        return $this->sender_id === auth()->id();
    }
}
