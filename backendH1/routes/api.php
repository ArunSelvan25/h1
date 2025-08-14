<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\PropertyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::controller(PropertyController::class)->group(function () {
        Route::get('/properties', 'getAllProperties');
        Route::get('/properties/{id?}', 'getPropertyById');
        Route::post('/tenant', 'addTenant');
        Route::post('/transactions', 'storeTransaction');
        Route::post('/transaction/update', 'updateTransactionStatus');
        Route::post('/remove-tenant', 'removeTenantFromProperty');

        Route::get('/tenants', 'getAllTenants');
        Route::get('/tenant/{id}', 'getTenantDetails');

    });
});