import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyServices } from '../../../../services/property/property-services';

@Component({
  selector: 'app-add-transaction-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-transaction-component.html',
  styleUrl: './add-transaction-component.css'
})
export class AddTransactionComponent implements OnInit {

  @Output() closePopup = new EventEmitter()
  
  propertyService = inject(PropertyServices)

  ngOnInit(): void {
    this.propertyService.transactionForm.patchValue({
      rent: this.propertyService.propertyView()?.rent,
      propertyId: this.propertyService.propertyView()?.id
    })
    this.propertyService.addTransactionFormField(true);
  }

  close () {
    this.closePopup.emit();
  }
}
