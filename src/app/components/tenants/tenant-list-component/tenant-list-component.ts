import { Component, inject } from '@angular/core';
import { TenantService } from '../../../services/tenant/tenant-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tenant-list-component',
  imports: [
    RouterLink
  ],
  templateUrl: './tenant-list-component.html',
  styleUrl: './tenant-list-component.css'
})
export class TenantListComponent {
  tenantService = inject(TenantService)
}
