import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property, Tenant,  } from '../property/property-services';

export interface TenantData {
  id: string,
  name: string,
  phone: string
}

interface TenantListResponse {
  message: string,
  data: TenantData[]
}

interface Transaction {
  id: number,
  date: string,
  amount: string,
  split_up: [],
  method: string,
  status: string,
  tenant: TenantData,
  property: Property,
}

interface TransactionResponse {
  message: string,
  data: Transaction[]
}

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private http = inject(HttpClient);

  tenantListData = signal<TenantData[]>([])
  transactionList = signal<Transaction[]>([])
  
  getTenantsList() {
    this.http.get<TenantListResponse>('http://127.0.0.1:8000/api/v1/tenants')
          .subscribe({
            next: (data) => {
              this.tenantListData.set(data.data)
            },
            error: (err) => {
              console.log('err', err);
            }
          });
  }

  getTransactionByTenant(id: number) {
    this.http.get<TransactionResponse>('http://127.0.0.1:8000/api/v1/tenant/' + id)
          .subscribe({
            next: (data) => {
              this.transactionList.set(data.data);
            },
            error: (err) => {
              console.log('err', err);
            }
          });
  }
}
