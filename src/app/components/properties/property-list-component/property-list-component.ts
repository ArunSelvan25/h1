import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PropertyServices } from '../../../services/property/property-services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-list-component',
  imports: [
    NgClass
  ],
  templateUrl: './property-list-component.html',
  styleUrl: './property-list-component.css'
})
export class PropertyListComponent {

  propertyService = inject(PropertyServices)
  router = inject(Router)

  showProperty(id: number) {
    this.router.navigate([`/property/${id}`])
    
  }
}
