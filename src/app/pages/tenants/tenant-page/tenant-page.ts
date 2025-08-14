import { Component, inject, OnInit } from '@angular/core';
import { TenantListComponent } from '../../../components/tenants/tenant-list-component/tenant-list-component';
import { TenantService } from '../../../services/tenant/tenant-service';

@Component({
  selector: 'app-tenant-page',
  imports: [
    TenantListComponent
  ],
  templateUrl: './tenant-page.html',
  styleUrl: './tenant-page.css'
})
export class TenantPage implements OnInit {

  tenantService = inject(TenantService)

  ngOnInit(): void {
    this.tenantService.getTenantsList();
  }
  
}
