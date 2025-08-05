import { DecimalPipe, DatePipe, NgClass, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PropertyServices } from '../../../../services/property/property-services';

@Component({
  selector: 'app-transaction-list',
  imports: [
    NgClass,
    DatePipe,
    DecimalPipe,
    KeyValuePipe
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList {

  propertyService = inject(PropertyServices);

  @Input() listData: any;

  @Output() addTransactions = new EventEmitter()

  openDropdownIndex: number | null = null;

  expandedRows = new Set<number>();

  downloadInvoice (txn: any) {
    console.log('txn', txn);
  }

  addTransaction(id: number) {
    this.addTransactions.emit(id);
  }

  changeTransactionStatus(txn: any, newStatus: 'Pending' | 'Paid' | 'Failed') {
    this.propertyService.updateTransactionStatus(txn, newStatus)
  }

  handleStatusButtonClick(event: Event, index: number): void {
    event.stopPropagation();
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  toggleExpand(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

}
