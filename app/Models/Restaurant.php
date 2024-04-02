<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $cast = [
        'cuisine' => 'array'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'geo_point_lon',
        'geo_point_lat',
        'type',
        'name',
        'opening_hours',
        'cuisine',
        'phone',
        'website',
    ];
}