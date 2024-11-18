import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CreatorOneComponent } from '../../../components/creator/creator-one/creator-one.component';
import { ProductOneComponent } from '../../../components/product/product-one/product-one.component';
import { BlogsComponent } from '../../../components/blogs/blogs.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';

import {NgxTypedJsModule} from 'ngx-typed-js';

@Component({
  selector: 'app-index-one',
  standalone: true,
  imports: [CommonModule,NavbarComponent, FooterComponent, RouterLink, NgxTypedJsModule,CreatorOneComponent, ProductOneComponent, LiveAuctionComponent,BlogsComponent],
  templateUrl: './index-one.component.html',
  styleUrl: './index-one.component.scss'
})
export class IndexOneComponent implements OnInit {

  countdownDate: Date = new Date('September 13, 2024 6:0:0');
  days: number = 0
  hours: number = 0
  minutes: number =0 
  seconds: number = 0

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.calculateTime();
    }, 1000);
  }

  calculateTime() {
    const now = new Date().getTime();
    const difference = this.countdownDate.getTime() - now;

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }

}
