import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from '../../../services/tenant/tenant-service';
import { TransactionList } from '../../../components/properties/transactions/transaction-list/transaction-list';

@Component({
  selector: 'app-tenant-view-page',
  imports: [
    TransactionList
  ],
  templateUrl: './tenant-view-page.html',
  styleUrl: './tenant-view-page.css'
})
export class TenantViewPage implements OnInit {
  public activateRoute = inject(ActivatedRoute)
  public tenantService = inject(TenantService);

  ngOnInit(): void {
    console.log('this.activateRoute', this.activateRoute.snapshot.paramMap.get('id'));
    this.tenantService.getTransactionByTenant(Number(this.activateRoute.snapshot.paramMap.get('id')))
  }
}
