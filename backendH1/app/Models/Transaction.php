<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'tenant_id',
        'property_id',
        'date',
        'amount',
        'split_up',
        'method',
        'status',
    ];

    protected $casts = [
        'split_up' => 'array',
        'date' => 'date',
    ];

    /**
     * Get the tenant associated with the transaction.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the property associated with the transaction.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
