<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = [
        'name', 
        'status'
    ];

    public function properties()
    {
        return $this->belongsToMany(Property::class, 'amenity_property')->withTimestamps();
    }
}
