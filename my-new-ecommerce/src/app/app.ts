import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './module/feture/components/home/home.component';
import { NavbarComponent } from './module/shared/components/navbar/navbar.component';
import { Footer } from './module/shared/components/footer/footer';
import { Products } from './module/feture/components/products/products';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, Footer,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'my-new-ecommerce';
}
