import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-800 text-white py-8 mt-auto">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 Modern E-Commerce. All rights reserved.</p>
        <p class="text-gray-400 mt-2">Built with Angular 18 & Spring Boot 3</p>
      </div>
    </footer>
  `
})
export class FooterComponent {}
