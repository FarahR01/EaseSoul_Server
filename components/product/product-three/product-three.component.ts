import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Nftdata from '../../../data/nftdata.json'

@Component({
  selector: 'app-product-three',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-three.component.html',
  styleUrl: './product-three.component.scss'
})
export class ProductThreeComponent {

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
