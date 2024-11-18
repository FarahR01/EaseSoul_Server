import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CreatorTwoComponent } from '../../../components/creator/creator-two/creator-two.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';
import { BlogsComponent } from '../../../components/blogs/blogs.component';
import { ServicesComponent } from '../../../components/services/services.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-index-five',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CreatorTwoComponent, LiveAuctionComponent,BlogsComponent, ServicesComponent, FooterComponent],
  templateUrl: './index-five.component.html',
  styleUrl: './index-five.component.scss'
})
export class IndexFiveComponent {
    slider1 = [
      "assets/images/items/16.jpg","assets/images/items/18.jpg","assets/images/items/20.jpg","assets/images/items/22.jpg","assets/images/items/24.jpg","assets/images/items/26.jpg",
      "assets/images/items/28.jpg","assets/images/items/16.jpg","assets/images/items/18.jpg","assets/images/items/20.jpg","assets/images/items/22.jpg",
    ]
    slider2 = [
      "assets/images/items/17.jpg","assets/images/items/19.jpg","assets/images/items/21.jpg","assets/images/items/23.jpg","assets/images/items/25.jpg","assets/images/items/27.jpg",
      "assets/images/items/29.jpg","assets/images/items/17.jpg","assets/images/items/19.jpg","assets/images/items/21.jpg","assets/images/items/23.jpg",
    ]
}
