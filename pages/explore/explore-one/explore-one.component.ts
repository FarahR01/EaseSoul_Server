import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ProductTwoComponent } from '../../../components/product/product-two/product-two.component';
import { SubscriptionComponent } from '../../../components/subscription/subscription.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-explore-one',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent,ProductTwoComponent,SubscriptionComponent,FooterComponent],
  templateUrl: './explore-one.component.html',
  styleUrl: './explore-one.component.scss'
})
export class ExploreOneComponent {

}
