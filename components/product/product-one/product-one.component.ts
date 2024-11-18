
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import NftData from '../../../data/nftdata.json'

@Component({
  selector: 'app-product-one',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-one.component.html',
  styleUrl: './product-one.component.scss'
})
export class ProductOneComponent {

  nftData = NftData
  
@Input() filter:any
@Input() showAll:any

  selectedCategory:any = null
  filteredData = this.nftData;

  matchCategory(category:any){
    this.selectedCategory = category
    this.filteredData = this.selectedCategory
    ? this.nftData.filter((item) => item.category === this.selectedCategory)
    : this.nftData;
  }

  
 
  countdownDate: Date = new Date('September 13, 2024 6:0:0'); // Set your countdown end date here
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
