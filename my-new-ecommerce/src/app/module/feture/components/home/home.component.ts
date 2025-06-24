import { Component } from '@angular/core';
import { MainCarouselComponent } from "./main-carousel/main-carousel.component";
import { ProductSliderComponent } from "./product-slider/product-slider.component";
import { femmeRobe } from '../../../../../Data/Femme/Robe/femmeRobe';
import { femmeShoes } from '../../../../../Data/Femme/Shoes/femmeShoes';
import { hommeDenim } from '../../../../../Data/Homme/Denim/hommeDenim';
import { hommePantalon } from '../../../../../Data/Homme/Pantalon/hommePantalon';
import { filletteRobe } from '../../../../../Data/Fillette/Robe/filletteRobe';
import { garconPantalon } from '../../../../../Data/Garcon/Pantalon/garconPantalon';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarouselComponent, ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  femmeRobe: any
  femmeShoes: any
  hommeDenim: any
  hommePantalon: any
  filletteRobe: any
  garconPantalon: any
  ngOnInit() {
    this.femmeRobe = femmeRobe.slice(0, 4)
    this.femmeShoes = femmeShoes.slice(0, 4)
    this.hommeDenim = hommeDenim.slice(0, 4)
    this.hommePantalon = hommePantalon.slice(0, 4)
    this.filletteRobe = filletteRobe.slice(0, 4)
    this.garconPantalon=garconPantalon.slice(0,4)
  }
}
