import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';
import { SubscriptionComponent } from '../../../components/subscription/subscription.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent,LiveAuctionComponent,SubscriptionComponent,FooterComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss'
})
export class AuctionComponent {

}
