import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Tenant {
  name: string;
  phone: string;
}

export interface Property {
  id: number;
  name: string;
  location: string;
  phone: string;
  rent: string;
  advance: string;
  type: string | null;
  status: 'Available' | 'Occupied';
  bedrooms: number;
  bathrooms: number;
  furnishing: string | null;
  area_sqft: number;
  amenities: string[];
  images: string[];
  tenant: Tenant;
}

export interface PropertyWithTransaction {
  id: number;
  name: string;
  location: string;
  phone: string;
  rent: string;
  advance: string;
  type: string | null;
  status: 'Available' | 'Occupied';
  bedrooms: number;
  bathrooms: number;
  furnishing: string | null;
  area_sqft: number;
  amenities: string[];
  images: string[];
  tenant: Tenant;
  transactions: []
}

@Injectable({
  providedIn: 'root'
})

export class PropertyServices {

  private http = inject(HttpClient);

  viewedPropertyId = signal<number>(0)
  propertyView = signal<PropertyWithTransaction | null>(null);
  isAddTransaction = signal<boolean>(false);

  tenantDatas = signal<any>({});
  kycData = signal<any>({});
  transactionListData = signal<any>({});

  propertyData = signal<Property[]>([])

  tenantForm!: FormGroup;
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildTenantForm();
    this.transactionFormBuild();
  }

  buildTenantForm() {
    this.tenantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      advance: [, [Validators.required, Validators.min(0)]],
      paidDate: [null, [Validators.required]],
      propertyId: ['', [Validators.required]],
    });
  }

  transactionFormBuild() {
    this.transactionForm = this.fb.group({
      rent: [null, Validators.required],
      date: [this.getTodayDate(), Validators.required],
      fields: this.fb.array([]),
      propertyId: [null, [Validators.required]]
    });

    this.transactionFields.valueChanges.subscribe((fields) => {
      const total = fields.reduce((sum: number, field: any) => {
        const value = parseFloat(field.value);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);

      this.transactionForm.get('rent')?.setValue(total, { emitEvent: false });
    });
  }

  getProperties() {
    this.http.get<{message: string, data: Property[]}>('http://127.0.0.1:8000/api/v1/properties')
      .subscribe({
        next: (data) => {
          this.propertyData.set(data.data);
          this.tenantDatas.set({});
        },
        error: (err) => {
          console.log('err', err);
        }
      });
  }

  getPropertyById(id: number) {
    return this.http.get<{message: string, data: PropertyWithTransaction}>(`http://127.0.0.1:8000/api/v1/properties/${id}`);
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
  createField(isFirst: boolean = false): FormGroup {
    console.log('asdsad');
    
    if (isFirst) {
      return this.fb.group({
        name: ['Rent', Validators.required],
        value: [this.propertyView()?.rent, Validators.required]
      });
    } else {
      return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    }); 
    }
  }

  // Add a field
  addTransactionFormField(isFirst: boolean = false) {
    this.transactionFields.push(this.createField(isFirst));
  }

  // Remove a field by index
  removeTransactionField(index: number) {
    this.transactionFields.removeAt(index);
  }

  removeFieldByRef(field: AbstractControl) {
    const index = this.transactionFields.controls.indexOf(field);
    if (index !== -1) {
      this.transactionFields.removeAt(index);
    }
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.http.post('http://127.0.0.1:8000/api/v1/transactions', this.transactionForm.value).subscribe({
        next: (response) => {
          this.getPropertyDetails();
          this.transactionFormBuild();
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.transactionForm.markAllAsTouched();
    }
    this.isAddTransaction.set(false)
  }

  submitForm() {
    this.http.post('http://127.0.0.1:8000/api/v1/tenant', this.tenantForm.value).subscribe({
      next: (response) => {
        this.getPropertyDetails();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getPropertyDetails() {
    this.getPropertyById(this.viewedPropertyId()).subscribe({
        next: (data) => {
          this.propertyView.set(data.data);
          this.tenantDatas.set(data.data.tenant || {});
          this.kycData.set(data.data.images);
          this.transactionListData.set(data.data.transactions)
        },
        error: (err) => {
          console.log('err', err);
        }
      });
  }

  updateTransactionStatus(txn: any, newStatus: 'Pending' | 'Paid' | 'Failed') {
    let transactionUpdate = {
      transactionId: txn.id,
      status: newStatus
    }
    this.http.post('http://127.0.0.1:8000/api/v1/transaction/update', transactionUpdate).subscribe({
      next: (response) => {
        this.getPropertyDetails();
        txn.status = newStatus;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  removeTenantFromProperty(propertyId: number) {
    let data = {
      propertyId
    }

    return this.http.post('http://127.0.0.1:8000/api/v1/remove-tenant', data);
  }
}
