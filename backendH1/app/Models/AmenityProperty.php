<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AmenityProperty extends Pivot
{
    protected $table = 'amenity_property';

    protected $fillable = ['property_id', 'amenity_id'];
}
