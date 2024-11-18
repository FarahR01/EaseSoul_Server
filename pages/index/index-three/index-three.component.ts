import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BlogsComponent } from '../../../components/blogs/blogs.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProductThreeComponent } from '../../../components/product/product-three/product-three.component';
import { CreatorThreeComponent } from '../../../components/creator/creator-three/creator-three.component';
import { ServicesComponent } from '../../../components/services/services.component';

@Component({
  selector: 'app-index-three',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent,BlogsComponent,LiveAuctionComponent,FooterComponent,ProductThreeComponent,CreatorThreeComponent,ServicesComponent],
  templateUrl: './index-three.component.html',
  styleUrl: './index-three.component.scss'
})
export class IndexThreeComponent {

}
