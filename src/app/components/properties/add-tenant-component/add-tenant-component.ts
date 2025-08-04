import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyServices } from '../../../services/property/property-services';

@Component({
  selector: 'app-add-tenant-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-tenant-component.html',
  styleUrl: './add-tenant-component.css'
})
export class AddTenantComponent {

  isSubmitDisabled = false;

  constructor (public propertyService: PropertyServices) {
    if (this.propertyService.propertyData()[0].tenant) {
      const tenant = this.propertyService.propertyData()[0].tenant;

      if (tenant) {
        this.propertyService.tenantForm.patchValue({
          name: tenant.name,
          phone: tenant.phone,
          advance: tenant.advance ?? 0,
          paidDate: tenant.paidDate ?? null,
        });

        this.propertyService.tenantForm.get('name')?.disable();
        this.propertyService.tenantForm.get('phone')?.disable();
        this.propertyService.tenantForm.get('advance')?.disable();
        this.propertyService.tenantForm.get('paidDate')?.disable();

        this.isSubmitDisabled = true;
      }
    }
  }

}
