import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SelectFormComponent } from '../../../components/select-form/select-form.component';
import { ProductOneComponent } from '../../../components/product/product-one/product-one.component';
import { SubscriptionComponent } from '../../../components/subscription/subscription.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-explore-two',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, SelectFormComponent,ProductOneComponent, SubscriptionComponent,FooterComponent],
  templateUrl: './explore-two.component.html',
  styleUrl: './explore-two.component.scss'
})
export class ExploreTwoComponent {

}
