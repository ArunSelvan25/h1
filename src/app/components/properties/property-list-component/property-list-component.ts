import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class PropertyListComponent implements OnInit {

  propertyService = inject(PropertyServices)
  router = inject(Router)

  ngOnInit(): void {
    this.propertyService.viewedPropertyId.set(0)
    this.propertyService.getProperties();
  }

  showProperty(id: number) {
    this.router.navigate([`/property/${id}`])
  }

  addProperty() {
    this.router.navigate(['/add-property'])
  }
}
