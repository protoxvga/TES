<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['survey_id', 'restaurant_id', 'user_id', 'meeting_time'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'vote_user', 'vote_id', 'user_id');
    }
}
