<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = [
        'is_open',
    ];

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}