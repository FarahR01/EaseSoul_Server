import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tns } from 'tiny-slider';

import Nftdata from '../../../data/nftdata.json'

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss'
})
export class ProductSliderComponent {

  nftData = Nftdata
  slider:any

  ngAfterViewInit(): void {
    this.slider = tns({
      container: '.tiny-four-item-nav-arrow',
      controls: true,
      mouseDrag: true,
      loop: true,
      rewind: true,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 3000,
      navPosition: "bottom",
      controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
      nav: false,
      speed: 400,
      gutter: 12,
      responsive: {
          992: {
              items: 4
          },

          767: {
              items: 2
          },

          320: {
              items: 1
          },
      },
  });
    
  }

}
