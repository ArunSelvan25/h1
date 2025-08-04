import { Component, OnInit } from '@angular/core';
import { PropertyServices } from '../../../services/property/property-services';
import { FlowbiteService } from '../../../services/flowbite.service';

@Component({
  selector: 'app-property-view-component',
  imports: [],
  templateUrl: './property-view-component.html',
  styleUrl: './property-view-component.css'
})
export class PropertyViewComponent implements OnInit {

  property;
    
  constructor (public propertyService: PropertyServices, public flowbiteService: FlowbiteService) {
    this.property = this.propertyService.propertyData()[0]
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
