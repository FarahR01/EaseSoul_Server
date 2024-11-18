import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Nftdata from '../../../data/nftdata.json'

@Component({
  selector: 'app-product-two',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-two.component.html',
  styleUrl: './product-two.component.scss'
})
export class ProductTwoComponent {
  @Input() showAll: any
  @Input() title: any
  @Input() filter: any

  nftdata = Nftdata;
  selectedCategory:any = null
  filteredData = this.nftdata;

  matchCategory(category:any){
    this.selectedCategory = category
    this.filteredData = this.selectedCategory
    ? this.nftdata.filter((item) => item.category === this.selectedCategory)
    : this.nftdata;
  }
}
