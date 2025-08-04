import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/layout/navbar-component/navbar-component';
import { FooterComponent } from '../../../components/layout/footer-component/footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
