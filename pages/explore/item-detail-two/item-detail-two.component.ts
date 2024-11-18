import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-item-detail-two',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, LightgalleryModule, LiveAuctionComponent, FooterComponent],
  templateUrl: './item-detail-two.component.html',
  styleUrl: './item-detail-two.component.scss'
})
export class ItemDetailTwoComponent {
  activeTab:number = 1

  showModal:boolean = false

  bidModal(event:any){
    event.preventDefault()
    this.showModal = !this.showModal
  }

  showModal2:boolean = false

  bidModal2(event:any){
    event.preventDefault()
    this.showModal2 = !this.showModal2
  }

  onTabClick(index:number){
    this.activeTab = index
  }

 


  bids = [
    {
      image:'assets/images/client/01.jpg',
      title1:'2 WETH',
      title:'0xe849fa28a...ea14',
      time:'6 hours ago'
    },
    {
      image:'assets/images/client/02.jpg',
      title1:'0.001 WETH',
      title:'VOTwear',
      time:'6 hours ago'
    },
    {
      image:'assets/images/client/03.jpg',
      title1:'1.225 WETH',
      title:'PandaOne',
      time:'6 hours ago'
    },
  ]

  activity = [ 
    {
      image:'assets/images/items/1.jpg',
      title:'Digital Art Collection',
      title2:'Started Following',
      name:'@Panda',
      time:'1 hours ago'
    },
    
    {
      image:'assets/images/items/2.jpg',
      title:'Wow! That Brain Is Floating',
      title2:'Liked by',
      name:'@ButterFly',
      time:'2 hours ago'
    },
  ]
}
