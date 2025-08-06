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
    const form = this.propertyService.tenantForm;
    if (Object.keys(this.tenantData).length) {
      // Pre-fill the form with existing tenant data
      form.patchValue({
        name: this.tenantData.name,
        phone: this.tenantData.phone,
        advance: this.tenantData.advance ?? 0,
        paidDate: this.tenantData.paid_date ?? null,
      });

      form.get('name')?.disable();
      form.get('phone')?.disable();
      form.get('advance')?.disable();
      form.get('paidDate')?.disable();

      this.isSubmitDisabled = true;
    } else {
      // Reset the form and re-enable all controls
      form.reset({
        name: '',
        phone: '',
        advance: 0,
        paidDate: null,
        propertyId: this.propertyService.viewedPropertyId(),
      });

      form.get('name')?.enable();
      form.get('phone')?.enable();
      form.get('advance')?.enable();
      form.get('paidDate')?.enable();

      this.isSubmitDisabled = false;
    }

    // Ensure propertyId is always patched even if tenantData is empty
    form.patchValue({
      propertyId: this.propertyService.viewedPropertyId()
    });

  }

  submitForm() {
    if (this.propertyService.tenantForm.valid) {
      this.isSubmitDisabled = true;
      this.propertyService.submitForm()
    } else {
      this.propertyService.tenantForm.markAllAsTouched();
    }
  }

  removeTenant(propertyId: number) {
    this.propertyService.removeTenantFromProperty(propertyId).subscribe({
      next: (response) => {
        console.log('response', response);
        this.propertyService.buildTenantForm();
        this.ngOnInit();
      },
      error: (error) => console.error('Error:', error),
    });
  }

}
