import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { LiveAuctionComponent } from '../../../components/live-auction/live-auction.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import NftData from '../../../data/nftdata.json'

@Component({
  selector: 'app-item-detail-one',
  standalone: true,
  imports: [CommonModule, RouterLink , NavbarComponent, LiveAuctionComponent,FooterComponent],
  templateUrl: './item-detail-one.component.html',
  styleUrl: './item-detail-one.component.scss'
})
export class ItemDetailOneComponent {

  nftData = NftData
  nftId:any ;
  data:any ;

  constructor(private route:ActivatedRoute){}

  

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

  countdownDate: Date = new Date('September 13, 2024 6:0:0');
  days: number = 0
  hours: number = 0
  minutes: number =0
  seconds: number = 0

  ngOnInit(): void {
    setInterval(() => {
      this.calculateTime();
    }, 1000);

    this.nftId = this.route.snapshot.params['id'];
    this.data = this.nftData.find(x => x.id == this.nftId);
  }
  calculateTime() {
    const now = new Date().getTime();
    const difference = this.countdownDate.getTime() - now;
    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
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
      image:'assets/images/gif/1.gif',
      title:'Skrrt Cobain Official',
      title2:'Liked by',
      name:'@ButterFly',
      time:'2 hours ago'
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
