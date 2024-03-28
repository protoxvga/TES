<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['survey_id', 'restaurant_id'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
