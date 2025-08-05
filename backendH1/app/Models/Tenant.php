<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'name',
        'phone',
    ];

    public function properties()
    {
        return $this->belongsToMany(Property::class, 'property_tenant')
                    ->using(PropertyTenant::class)
                    ->withPivot(['advance', 'paid_date'])
                    ->withTimestamps();
    }
}
