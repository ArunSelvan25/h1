<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FurnishingType extends Model
{
    protected $fillable = [
        'name', 
        'status'
    ];
}
