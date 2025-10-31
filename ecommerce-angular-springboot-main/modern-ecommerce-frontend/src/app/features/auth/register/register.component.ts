import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-8">Register</h2>
        <p class="text-center">Registration form coming soon...</p>
      </div>
    </div>
  `
})
export class RegisterComponent {}
