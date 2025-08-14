<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        Schema::create('furnishing_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        Schema::create('property_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });

        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('location');
            $table->string('phone');
            $table->unsignedBigInteger('property_type_id');
            $table->unsignedBigInteger('furnishing_type_id');
            $table->unsignedBigInteger('status_id');
            $table->decimal('rent', 10, 2);
            $table->decimal('advance', 10, 2);
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->integer('area_sqft');
            $table->timestamps();

            $table->foreign('property_type_id')->references('id')->on('property_types')->onDelete('restrict');
            $table->foreign('furnishing_type_id')->references('id')->on('furnishing_types')->onDelete('restrict');
            $table->foreign('status_id')->references('id')->on('property_statuses')->onDelete('restrict');
        });

        Schema::create('property_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->string('url');
            $table->timestamps();

            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
        });

        Schema::create('amenity_property', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('amenity_id');
            $table->timestamps();

            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('amenity_id')->references('id')->on('amenities')->onDelete('cascade');
        });

        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->timestamps();
        });

        Schema::create('property_tenant', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('tenant_id');
            $table->decimal('advance', 10, 2);
            $table->date('paid_date')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();

            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('property_id')->constrained()->onDelete('cascade');

            $table->date('date');
            $table->decimal('amount', 10, 2);
            $table->json('split_up')->nullable(); // EB, Water, etc.

            $table->string('method')->nullable(); // Cash, UPI, etc.
            $table->enum('status', ['Paid', 'Pending', 'Failed'])->default('Pending');

            $table->timestamps();
        });

        // Seeder section
        $data = [
                    [
                        "id" => 1,
                        "name" => "Greenwood Villa",
                        "location" => "Bangalore, Karnataka",
                        "phone" => "+91-9876543210",
                        "rent" => 25000,
                        "advance" => 75000,
                        "type" => "Apartment",
                        "status" => "Available",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Semi-furnished",
                        "area_sqft" => 1450,
                        "amenities" => ["Gym", "Lift", "Security", "Parking"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 2,
                        "name" => "Lakeview Residency",
                        "location" => "Hyderabad, Telangana",
                        "phone" => "+91-9123456789",
                        "rent" => 30000,
                        "advance" => 90000,
                        "type" => "Flat",
                        "status" => "Occupied",
                        "bedrooms" => 2,
                        "bathrooms" => 2,
                        "furnishing" => "Furnished",
                        "area_sqft" => 1200,
                        "amenities" => ["Swimming Pool", "Clubhouse", "24x7 Security"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 3,
                        "name" => "Palm Grove Heights",
                        "location" => "Chennai, Tamil Nadu",
                        "phone" => "+91-9988776655",
                        "rent" => 18000,
                        "advance" => 54000,
                        "type" => "Independent House",
                        "status" => "Available",
                        "bedrooms" => 2,
                        "bathrooms" => 1,
                        "furnishing" => "Unfurnished",
                        "area_sqft" => 1100,
                        "amenities" => ["Parking", "Garden"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 4,
                        "name" => "Skyline Towers",
                        "location" => "Mumbai, Maharashtra",
                        "phone" => "+91-9870012345",
                        "rent" => 42000,
                        "advance" => 126000,
                        "type" => "Penthouse",
                        "status" => "Available",
                        "bedrooms" => 4,
                        "bathrooms" => 3,
                        "furnishing" => "Furnished",
                        "area_sqft" => 2000,
                        "amenities" => ["Rooftop Pool", "Gym", "Concierge"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ],
                    ],
                    [
                        "id" => 5,
                        "name" => "Cedar Springs Apartments",
                        "location" => "Pune, Maharashtra",
                        "phone" => "+91-9823456789",
                        "rent" => 22000,
                        "advance" => 66000,
                        "type" => "Apartment",
                        "status" => "Occupied",
                        "bedrooms" => 2,
                        "bathrooms" => 2,
                        "furnishing" => "Semi-furnished",
                        "area_sqft" => 1250,
                        "amenities" => ["Clubhouse", "Kids Play Area", "Parking"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 6,
                        "name" => "Golden Leaf Homes",
                        "location" => "Kochi, Kerala",
                        "phone" => "+91-9745632100",
                        "rent" => 20000,
                        "advance" => 60000,
                        "type" => "Villa",
                        "status" => "Available",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Semi-furnished",
                        "area_sqft" => 1600,
                        "amenities" => ["Private Garden", "Parking", "Security"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 7,
                        "name" => "Orchid Meadows",
                        "location" => "Indore, Madhya Pradesh",
                        "phone" => "+91-9332211008",
                        "rent" => 15000,
                        "advance" => 45000,
                        "type" => "Apartment",
                        "status" => "Available",
                        "bedrooms" => 2,
                        "bathrooms" => 1,
                        "furnishing" => "Unfurnished",
                        "area_sqft" => 900,
                        "amenities" => ["Lift", "Security"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 8,
                        "name" => "Sunset Boulevard",
                        "location" => "Jaipur, Rajasthan",
                        "phone" => "+91-9832109876",
                        "rent" => 28000,
                        "advance" => 84000,
                        "type" => "Apartment",
                        "status" => "Occupied",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Furnished",
                        "area_sqft" => 1400,
                        "amenities" => ["Gym", "Security", "Pool"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 9,
                        "name" => "Hilltop Residency",
                        "location" => "Shimla, Himachal Pradesh",
                        "phone" => "+91-8123045678",
                        "rent" => 32000,
                        "advance" => 96000,
                        "type" => "Independent House",
                        "status" => "Available",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Furnished",
                        "area_sqft" => 1300,
                        "amenities" => ["Fireplace", "Mountain View", "Parking"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 10,
                        "name" => "Urban Nest",
                        "location" => "Ahmedabad, Gujarat",
                        "phone" => "+91-9011223344",
                        "rent" => 27000,
                        "advance" => 81000,
                        "type" => "Flat",
                        "status" => "Available",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Semi-furnished",
                        "area_sqft" => 1350,
                        "amenities" => ["Security", "Parking", "Garden"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 11,
                        "name" => "City Center Heights",
                        "location" => "Delhi, NCR",
                        "phone" => "+91-9876541200",
                        "rent" => 38000,
                        "advance" => 114000,
                        "type" => "Apartment",
                        "status" => "Occupied",
                        "bedrooms" => 3,
                        "bathrooms" => 2,
                        "furnishing" => "Furnished",
                        "area_sqft" => 1500,
                        "amenities" => ["Lift", "Generator Backup", "Gym"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        ]
                    ],
                    [
                        "id" => 12,
                        "name" => "Riverbend Cottage",
                        "location" => "Manali, Himachal Pradesh",
                        "phone" => "+91-9812345678",
                        "rent" => 24000,
                        "advance" => 72000,
                        "type" => "Cottage",
                        "status" => "Available",
                        "bedrooms" => 2,
                        "bathrooms" => 1,
                        "area_sqft" => 1000,
                        "furnishing" => "Semi-furnished",
                        "amenities" => ["Wood Heater", "River View", "Lawn"],
                        "images" => [
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        ]
                    ]
        ];


        // Seed property types, furnishing types, statuses, and amenities
        $propertyTypes = collect(array_unique(array_column($data, 'type')));
        $furnishings = collect(array_unique(array_column($data, 'furnishing')));
        $statuses = collect(array_unique(array_column($data, 'status')));
        $allAmenities = collect($data)->pluck('amenities')->flatten()->unique();

        $propertyTypeMap = $propertyTypes->mapWithKeys(function ($type) {
            return [$type => DB::table('property_types')->insertGetId(['name' => $type, 'created_at' => now(), 'updated_at' => now()])];
        });

        $furnishingMap = $furnishings->mapWithKeys(function ($item) {
            return [$item => DB::table('furnishing_types')->insertGetId(['name' => $item, 'created_at' => now(), 'updated_at' => now()])];
        });

        $statusMap = $statuses->mapWithKeys(function ($item) {
            return [$item => DB::table('property_statuses')->insertGetId(['name' => $item, 'created_at' => now(), 'updated_at' => now()])];
        });

        $amenityMap = $allAmenities->mapWithKeys(function ($item) {
            return [$item => DB::table('amenities')->insertGetId(['name' => $item, 'created_at' => now(), 'updated_at' => now()])];
        });

        foreach ($data as $property) {
            $propertyId = DB::table('properties')->insertGetId([
                'name' => $property['name'],
                'location' => $property['location'],
                'phone' => $property['phone'],
                'property_type_id' => $propertyTypeMap[$property['type']],
                'furnishing_type_id' => $furnishingMap[$property['furnishing']],
                'status_id' => $statusMap[$property['status']],
                'rent' => $property['rent'],
                'advance' => $property['advance'],
                'bedrooms' => $property['bedrooms'],
                'bathrooms' => $property['bathrooms'],
                'area_sqft' => $property['area_sqft'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Images
            foreach ($property['images'] as $img) {
                DB::table('property_images')->insert([
                    'property_id' => $propertyId,
                    'url' => $img,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Amenities
            foreach ($property['amenities'] as $amenity) {
                DB::table('amenity_property')->insert([
                    'property_id' => $propertyId,
                    'amenity_id' => $amenityMap[$amenity],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

    }

    public function down(): void
    {
        Schema::dropIfExists('property_tenant');
        Schema::dropIfExists('tenants');
        Schema::dropIfExists('amenity_property');
        Schema::dropIfExists('property_images');
        Schema::dropIfExists('properties');
        Schema::dropIfExists('amenities');
        Schema::dropIfExists('property_statuses');
        Schema::dropIfExists('furnishing_types');
        Schema::dropIfExists('property_types');
    }
};
