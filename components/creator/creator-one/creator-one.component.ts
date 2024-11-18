import { Component } from '@angular/core';
import Creator from '../../../data/creator.json'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { tns } from 'tiny-slider';

@Component({
  selector: 'app-creator-one',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creator-one.component.html',
  styleUrl: './creator-one.component.scss'
})
export class CreatorOneComponent {

  creator:any = Creator

  slider:any

  ngAfterViewInit(): void {
      this.slider = tns({
      container: '.tiny-five-item-nav-arrow',
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
      gutter: 10,
      responsive: {
          992: {
              items: 5
          },

          767: {
              items: 3
          },

          320: {
              items: 1
          },
      },
  });
    
  }
}
