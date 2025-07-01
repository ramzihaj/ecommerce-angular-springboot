import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { NavContentComponent } from './nav-content/nav-content.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatMenuModule,NgIf,NavContentComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  isNavbarContentOpen:any
  currentSection: any

  constructor(private router:Router){}

  openNavbarContent(section:any) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }
  navigateTo(path:any) {
    this.router.navigate([path])
  }
  @HostListener('document:click',['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector(".modal-container");
    const openButtons = document.querySelectorAll(".open-button");

    let clickInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton=true
      }
    })
    if (modalContainer && !clickInsideButton  && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }

}
