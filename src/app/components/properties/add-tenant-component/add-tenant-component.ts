import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PropertyServices } from '../../../services/property/property-services';

@Component({
  selector: 'app-add-tenant-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-tenant-component.html',
  styleUrl: './add-tenant-component.css'
})
export class AddTenantComponent implements OnInit {

  propertyService = inject(PropertyServices)
  platformId = inject(PLATFORM_ID);

  @Input() tenantData: any;

  isSubmitDisabled = false;

  ngOnInit() {
    
    if (Object.keys(this.tenantData).length) {
      this.propertyService.tenantForm.patchValue({
        name: this.tenantData.name,
        phone: this.tenantData.phone,
        advance: this.tenantData.advance ?? 0,
        paidDate: this.tenantData.paid_date ?? null,
      });

      this.propertyService.tenantForm.get('name')?.disable();
      this.propertyService.tenantForm.get('phone')?.disable();
      this.propertyService.tenantForm.get('advance')?.disable();
      this.propertyService.tenantForm.get('paidDate')?.disable();
      

      this.isSubmitDisabled = true;
    }
    this.propertyService.tenantForm.patchValue({
      propertyId: this.propertyService.viewedPropertyId()
    })
    this.propertyService.tenantForm.get('propertyId');

  }

  submitForm() {
    if (this.propertyService.tenantForm.valid) {
      this.isSubmitDisabled = true;
      this.propertyService.submitForm()
    } else {
      this.propertyService.tenantForm.markAllAsTouched();
    }
  }

}
