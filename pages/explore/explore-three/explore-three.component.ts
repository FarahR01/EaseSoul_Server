import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ProductSliderComponent } from '../../../components/product/product-slider/product-slider.component';
import { SubscriptionComponent } from '../../../components/subscription/subscription.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-explore-three',
  standalone: true,
  imports: [ CommonModule, RouterLink, NavbarComponent,ProductSliderComponent,SubscriptionComponent,FooterComponent],
  templateUrl: './explore-three.component.html',
  styleUrl: './explore-three.component.scss'
})
export class ExploreThreeComponent {

}
