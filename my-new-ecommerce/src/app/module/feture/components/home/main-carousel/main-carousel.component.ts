import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';



@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent {
  carouselData: any
  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.carouselData = homeCarouselData;
    this.autoPlay()
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 2000)
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;

  }

}
