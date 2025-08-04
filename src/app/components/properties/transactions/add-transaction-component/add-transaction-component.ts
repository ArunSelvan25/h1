import { Component, EventEmitter, inject, Output } from '@angular/core';
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
export class AddTransactionComponent {

  @Output() closePopup = new EventEmitter()
  
  propertyService = inject(PropertyServices)

  close () {
    this.closePopup.emit();
  }
}
