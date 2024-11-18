import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Nftdata from '../../../data/nftdata.json'
import { SubscriptionComponent } from '../../../components/subscription/subscription.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-explore-four',
  standalone: true,
  imports: [CommonModule,RouterLink, SubscriptionComponent, FooterComponent,NavbarComponent],
  templateUrl: './explore-four.component.html',
  styleUrl: './explore-four.component.scss'
})
export class ExploreFourComponent {
  nftData = Nftdata

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
