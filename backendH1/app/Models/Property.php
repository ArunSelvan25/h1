<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'name',
        'location',
        'phone',
        'property_type_id',
        'furnishing_type_id',
        'status_id',
        'rent',
        'advance',
        'bedrooms',
        'bathrooms',
        'area_sqft',
    ];

    /**
     * Get the property type (e.g., Apartment, Villa).
     */
    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }

    /**
     * Get the furnishing type (e.g., Fully furnished, Semi-furnished).
     */
    public function furnishingType()
    {
        return $this->belongsTo(FurnishingType::class);
    }

    /**
     * Get the current status of the property (e.g., Available, Occupied).
     */
    public function status()
    {
        return $this->belongsTo(PropertyStatus::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'amenity_property')
                ->using(AmenityProperty::class)
                ->withTimestamps();
    }

    public function tenants()
    {
        return $this->belongsToMany(Tenant::class, 'property_tenant')
                    ->using(PropertyTenant::class)
                    ->withPivot(['advance', 'paid_date'])
                    ->withTimestamps()
                    ->where('property_tenant.status', 1);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
