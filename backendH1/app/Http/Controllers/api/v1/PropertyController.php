<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\Tenant;
use App\Models\PropertyTenant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
{
    public function __construct(
        Property $property,
        Tenant $tenant
    ) {
        $this->property = $property;
        $this->tenant = $tenant;
    }

    public function getAllProperties() {
        $data = Property::with([
            'propertyType',
            'furnishingType',
            'status',
            'images',
            'amenities',
            'tenants',
        ])->get();
    
        $propertyData = PropertyResource::collection($data);
        
        return response()->json(['message' => 'Property retrived successfully', 'data' => $propertyData]);
    }

    public function getPropertyById($propertyId) {
        $data = Property::with([
            'propertyType',
            'furnishingType',
            'status',
            'images',
            'amenities',
            'tenants',
            'transactions' => function ($query) {
                $query->orderBy('date', 'desc');
            },
            'transactions.tenant'
        ])->findOrFail($propertyId);

        $propertyData = new PropertyResource($data);
        return response()->json(['message' => 'Property retrived successfully', 'data' => $propertyData]);
    }

    public function addTenant(Request $request) {

        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'advance' => 'required|numeric',
            'paidDate' => 'required|date',
            'propertyId' => 'required|exists:properties,id',
        ]);
        
        // Check tenant already exists
        // If not exists store and retrive ID
        $tenant = $this->tenant->firstOrCreate(
            ['phone' => $validated['phone']],
            ['name' => $validated['name']]
        );

        DB::table('property_tenant')
            ->where('property_id', $validated['propertyId'])
            ->update(['status' => 0]);

        // with the ID from user and proeprty store it in DB 
        $tenant->properties()->syncWithoutDetaching([
            $validated['propertyId'] => [
                'advance' => $validated['advance'],
                'paid_date' => Carbon::parse($validated['paidDate'])->format('Y-m-d'),
            ]
        ]);

        return response()->json([
            'message' => 'Tenant assigned to property successfully.',
            'tenant' => $tenant
        ]);
    }

    public function storeTransaction(Request $request) {
        $validated = $request->validate([
            'rent' => 'required|numeric',
            'date' => 'required|date',
            'fields' => 'nullable|array',
            'fields.*.name' => 'required|string',
            'fields.*.value' => 'required|numeric',
            'propertyId' => 'required|exists:properties,id',
        ]);

        // Prepare the split_up array from fields
        $splitUp = collect($validated['fields'] ?? [])
            ->mapWithKeys(fn ($field) => [$field['name'] => (float) $field['value']])
            ->toArray();

        $tenantId = PropertyTenant::where('property_id', $validated['propertyId'])
        ->latest('id')
        ->first();

        $transaction = '';
        if ($tenantId) {
            $transaction = Transaction::create([
                'tenant_id'   => $tenantId->tenant_id,
                'property_id' => $validated['propertyId'],
                'date'        => Carbon::parse($validated['date'])->format('Y-m-d'),
                'amount'      => $validated['rent'],
                'split_up'    => $splitUp,
                'method'      => 'Cash',
                'status'      => 'Paid',
            ]);
        }

        return response()->json([
            'message' => 'Transaction recorded successfully.',
            'transaction' => $transaction,
        ]);
    }

    public function updateTransactionStatus(Request $request) {
        $transaction = Transaction::find($request->transactionId);

        if ($transaction) {
            $transaction->update([
                'status' => $request->status
            ]);
        }
        return response()->json([
            'message' => 'Transaction updated successfully.',
        ]);
    } 
}
