<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PropertyTenant extends Pivot
{
    protected $table = 'property_tenant';

    protected $fillable = [
        'property_id',
        'tenant_id',
        'advance',
        'paid_date',
        'status'
    ];
}
