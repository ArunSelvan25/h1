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
        
        $tenant = $this->tenant->firstOrCreate(
            ['phone' => $validated['phone']],
            ['name' => $validated['name']]
        );

        DB::table('property_tenant')
            ->where('property_id', $validated['propertyId'])
            ->update(['status' => 0]);

        $tenant->properties()->syncWithoutDetaching([
            $validated['propertyId'] => [
                'advance' => $validated['advance'],
                'paid_date' => Carbon::parse($validated['paidDate'])->format('Y-m-d'),
            ]
        ]);

        $transaction = $this->createTransaction(
            tenantId: $tenant->id,
            propertyId: $validated['propertyId'],
            amount: $validated['advance'],
            date: $validated['paidDate'],
            splitUp: ['Advance' => (float) $validated['advance']],
        );

        return response()->json([
            'message' => 'Tenant assigned to property successfully.',
            'tenant' => $tenant,
            'transaction' => $transaction,
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

        $splitUp = collect($validated['fields'] ?? [])
            ->mapWithKeys(fn ($field) => [$field['name'] => (float) $field['value']])
            ->toArray();

        $tenantRecord = PropertyTenant::where('property_id', $validated['propertyId'])
            ->where('status', 1)
            ->latest('id')
            ->first();

        $transaction = null;
        if ($tenantRecord) {
            $transaction = $this->createTransaction(
                tenantId: $tenantRecord->tenant_id,
                propertyId: $validated['propertyId'],
                amount: $validated['rent'],
                date: $validated['date'],
                splitUp: $splitUp
            );
        }

        return response()->json([
            'message' => 'Transaction recorded successfully.',
            'transaction' => $transaction,
        ]);
    }

    private function createTransaction(
        $tenantId, 
        $propertyId, 
        $amount, 
        $date, 
        array $splitUp = [], 
        $method = 'Cash', 
        $status = 'Paid'
    ) {
        return Transaction::create([
            'tenant_id'   => $tenantId,
            'property_id' => $propertyId,
            'date'        => Carbon::parse($date)->format('Y-m-d'),
            'amount'      => $amount,
            'split_up'    => $splitUp,
            'method'      => $method,
            'status'      => $status,
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

    public function removeTenantFromProperty(Request $request) {
        DB::table('property_tenant')
            ->where('property_id', $request->propertyId)
            ->update(['status' => 0]);

         return response()->json([
            'message' => 'Tenant removed from property successfully.',
        ]);
    }

    public function getAllTenants() {
        $tenants = $this->tenant->select('id', 'name', 'phone')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Tenant list successfully.',
            'data' => $tenants
        ]);

    }

    public function getTenantDetails($id) {
        $transactionsOfTenant = Transaction::where('tenant_id', $id)->with('property', 'tenant')->get();
        return response()->json([
            'message' => 'Tenant transactionlist success.',
            'data' => TransactionResource::collection($transactionsOfTenant)
        ]);
    }
}
