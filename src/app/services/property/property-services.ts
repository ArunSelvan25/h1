import { Injectable, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PropertyServices {

  viewedPropertyId = signal<number>(0)
  isAddTransaction = signal<boolean>(false);

  propertyData = signal([
    {
      "id": 1,
      "name": "Greenwood Villa",
      "location": "Bangalore, Karnataka",
      "phone": "+91-9876543210",
      "rent": 25000,
      "advance": 75000,
      "type": "Apartment",
      "status": "Available",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Semi-furnished",
      "area_sqft": 1450,
      "amenities": ["Gym", "Lift", "Security", "Parking"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 1',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 2,
      "name": "Lakeview Residency",
      "location": "Hyderabad, Telangana",
      "phone": "+91-9123456789",
      "rent": 30000,
      "advance": 90000,
      "type": "Flat",
      "status": "Occupied",
      "bedrooms": 2,
      "bathrooms": 2,
      "furnishing": "Furnished",
      "area_sqft": 1200,
      "amenities": ["Swimming Pool", "Clubhouse", "24x7 Security"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 2',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 3,
      "name": "Palm Grove Heights",
      "location": "Chennai, Tamil Nadu",
      "phone": "+91-9988776655",
      "rent": 18000,
      "advance": 54000,
      "type": "Independent House",
      "status": "Available",
      "bedrooms": 2,
      "bathrooms": 1,
      "furnishing": "Unfurnished",
      "area_sqft": 1100,
      "amenities": ["Parking", "Garden"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 3',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 4,
      "name": "Skyline Towers",
      "location": "Mumbai, Maharashtra",
      "phone": "+91-9870012345",
      "rent": 42000,
      "advance": 126000,
      "type": "Penthouse",
      "status": "Available",
      "bedrooms": 4,
      "bathrooms": 3,
      "furnishing": "Furnished",
      "area_sqft": 2000,
      "amenities": ["Rooftop Pool", "Gym", "Concierge"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 4',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 5,
      "name": "Cedar Springs Apartments",
      "location": "Pune, Maharashtra",
      "phone": "+91-9823456789",
      "rent": 22000,
      "advance": 66000,
      "type": "Apartment",
      "status": "Occupied",
      "bedrooms": 2,
      "bathrooms": 2,
      "furnishing": "Semi-furnished",
      "area_sqft": 1250,
      "amenities": ["Clubhouse", "Kids Play Area", "Parking"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 5',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 6,
      "name": "Golden Leaf Homes",
      "location": "Kochi, Kerala",
      "phone": "+91-9745632100",
      "rent": 20000,
      "advance": 60000,
      "type": "Villa",
      "status": "Available",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Semi-furnished",
      "area_sqft": 1600,
      "amenities": ["Private Garden", "Parking", "Security"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 6',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 7,
      "name": "Orchid Meadows",
      "location": "Indore, Madhya Pradesh",
      "phone": "+91-9332211008",
      "rent": 15000,
      "advance": 45000,
      "type": "Apartment",
      "status": "Available",
      "bedrooms": 2,
      "bathrooms": 1,
      "furnishing": "Unfurnished",
      "area_sqft": 900,
      "amenities": ["Lift", "Security"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 7',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 8,
      "name": "Sunset Boulevard",
      "location": "Jaipur, Rajasthan",
      "phone": "+91-9832109876",
      "rent": 28000,
      "advance": 84000,
      "type": "Apartment",
      "status": "Occupied",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Furnished",
      "area_sqft": 1400,
      "amenities": ["Gym", "Security", "Pool"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 8',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 9,
      "name": "Hilltop Residency",
      "location": "Shimla, Himachal Pradesh",
      "phone": "+91-8123045678",
      "rent": 32000,
      "advance": 96000,
      "type": "Independent House",
      "status": "Available",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Furnished",
      "area_sqft": 1300,
      "amenities": ["Fireplace", "Mountain View", "Parking"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 9',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 10,
      "name": "Urban Nest",
      "location": "Ahmedabad, Gujarat",
      "phone": "+91-9011223344",
      "rent": 27000,
      "advance": 81000,
      "type": "Flat",
      "status": "Available",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Semi-furnished",
      "area_sqft": 1350,
      "amenities": ["Security", "Parking", "Garden"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 10',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 11,
      "name": "City Center Heights",
      "location": "Delhi, NCR",
      "phone": "+91-9876541200",
      "rent": 38000,
      "advance": 114000,
      "type": "Apartment",
      "status": "Occupied",
      "bedrooms": 3,
      "bathrooms": 2,
      "furnishing": "Furnished",
      "area_sqft": 1500,
      "amenities": ["Lift", "Generator Backup", "Gym"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      'tenant': {
        'name': 'Tenant 11',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    },
    {
      "id": 12,
      "name": "Riverbend Cottage",
      "location": "Manali, Himachal Pradesh",
      "phone": "+91-9812345678",
      "rent": 24000,
      "advance": 72000,
      "type": "Cottage",
      "status": "Available",
      "bedrooms": 2,
      "bathrooms": 1,
      "area_sqft": 1000,
      "amenities": ["Wood Heater", "River View", "Lawn"],
      "images": [
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      'tenant': {
        'name': 'Tenant 12',
        'phone': '9894325176',
        'advance': 20000,
        'paidDate': '2024-01-20'
      }
    }
  ])

  transactions = signal([
    { user_id: 1, date: '2025-07-30', amount: 5000, fields: {
      'EB': 293, 'Water': 100
    }, method: 'Cash', status: 'Paid' },
    { user_id: 1, date: '2025-07-15', amount: 3000, fields: {
      'EB': 293, 'Water': 100
    }, method: 'Bank Transfer', status: 'Pending' },
    { user_id: 1, date: '2025-07-01', amount: 2500, fields: {
      'EB': 293, 'Water': 100
    }, method: 'UPI', status: 'Failed' },
    { user_id: 1, date: '2025-07-01', amount: 2500, fields: {
      'EB': 293, 'Water': 100
    }, method: 'UPI', status: 'Failed' },
    { user_id: 1, date: '2025-07-01', amount: 2500, fields: {
      'Water': 100
    }, method: 'UPI', status: 'Failed' },
    { user_id: 1, date: '2025-07-01', amount: 2500, fields: {
      'EB': 293
    }, method: 'UPI', status: 'Failed' },
  ]);

  tenantForm: FormGroup;
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tenantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      advance: [0, [Validators.required, Validators.min(0)]],
      paidDate: [null, [Validators.required]],
    });



    this.transactionForm = this.fb.group({
      rent: [null, Validators.required],
      date: [this.getTodayDate(), Validators.required],
      fields: this.fb.array([])
    });
    
   

    this.addTransactionFormField();
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }
  
  // Get the form array
  get transactionFields(): FormArray {
    return this.transactionForm.get('fields') as FormArray;
  }

  // Create a field group
  createField(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  // Add a field
  addTransactionFormField() {
    this.transactionFields.push(this.createField());
  }

  // Remove a field by index
  removeTransactionField(index: number) {
    console.log('index', index);
    
    this.transactionFields.removeAt(index);
  }

  removeFieldByRef(field: AbstractControl) {
    const index = this.transactionFields.controls.indexOf(field);
    if (index !== -1) {
      this.transactionFields.removeAt(index);
    }
  }

  // Submit
  onSubmit() {
    console.log(this.transactionForm.value);
    this.isAddTransaction.set(false)
  }

  submitForm() {
    if (this.tenantForm.valid) {
      this.tenantForm.reset();
    } else {
      this.tenantForm.markAllAsTouched();
    }
  }
}
