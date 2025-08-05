<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'amount' => $this->amount,
            'split_up' => $this->split_up,
            'method' => $this->method,
            'status' => $this->status,

             // Include full related models
            'tenant' => new TenantResource($this->whenLoaded('tenant')),
            'property' => new PropertyResource($this->whenLoaded('property')),
        ];
    }
}
