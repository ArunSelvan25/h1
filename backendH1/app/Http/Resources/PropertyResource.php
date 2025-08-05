<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tenant = $this->tenants->first();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'phone' => $this->phone,
            'rent' => (string) $this->rent,
            'advance' => (string) $this->advance,
            'type' => $this->propertyType['name'] ?? null,
            'status' => $this->status['name'] ?? null,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'furnishing' => $this->furnishingType['name'] ?? null,
            'area_sqft' => $this->area_sqft,
            'amenities' => $this->amenities->pluck('name')->all(),
            'images' => $this->images->pluck('url')->all(),
            'tenant' => $tenant ? [
                'id' => $tenant->id,
                'name' => $tenant->name,
                'phone' => $tenant->phone,
                'advance' => $tenant->pivot->advance,
                'paid_date' => $tenant->pivot->paid_date,
            ] : null,
            'transactions' => TransactionResource::collection($this->whenLoaded('transactions'))
        ];
    }
}
