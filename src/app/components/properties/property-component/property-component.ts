import { Component, inject } from '@angular/core';
import { PropertyViewComponent } from '../property-view-component/property-view-component';
import { AddTenantComponent } from '../add-tenant-component/add-tenant-component';
import { TransactionList } from '../transactions/transaction-list/transaction-list';
import { ActivatedRoute } from '@angular/router';
import { PropertyServices } from '../../../services/property/property-services';
import { AddTransactionComponent } from '../transactions/add-transaction-component/add-transaction-component';
import { KycPreviewComponent } from '../../users/kyc-preview-component/kyc-preview-component';

@Component({
  selector: 'app-property-component',
  imports: [
    PropertyViewComponent,
    AddTenantComponent,
    TransactionList,
    AddTransactionComponent,
    KycPreviewComponent
  ],
  templateUrl: './property-component.html',
  styleUrl: './property-component.css'
})
export class PropertyComponent {

  propertyService = inject(PropertyServices);

  constructor (private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      this.propertyService.viewedPropertyId.set(id);
    });
  }

  addTransactionData(event: number) {
    if (this.propertyService.viewedPropertyId()) {
      const selectedProperty = this.propertyService.propertyData().find(p => p.id === event);
      
      if (selectedProperty?.rent !== undefined) {
        this.propertyService.transactionForm.patchValue({ rent: selectedProperty.rent });
      }
    }
    
    this.propertyService.isAddTransaction.set(true);
  }

  closePopup() {
    this.propertyService.isAddTransaction.set(false);
  }
}
