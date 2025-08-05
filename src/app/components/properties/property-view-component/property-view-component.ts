import { Component } from '@angular/core';
import { PropertyServices } from '../../../services/property/property-services';

@Component({
  selector: 'app-property-view-component',
  imports: [],
  templateUrl: './property-view-component.html',
  styleUrl: './property-view-component.css'
})
export class PropertyViewComponent {


  constructor (public propertyService: PropertyServices) {}

}
