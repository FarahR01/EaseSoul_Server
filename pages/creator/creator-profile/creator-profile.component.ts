import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProductOneComponent } from '../../../components/product/product-one/product-one.component';
import Nftdata from '../../../data/nftdata.json'
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, ProductOneComponent],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent {

  nftData = Nftdata

  activeTab:number = 1 

  onTabClick(index:number){
    this.activeTab = index
  }

  activity = [
    {
      image:'assets/images/items/1.jpg',
      icon:'mdi mdi-account-check mdi-18px text-success',
      title:'Digital Art Collection',
      title2:'Started Following',
      name:'@Panda',
      time:'1 hours ago'
    },
    {
      image:'assets/images/gif/1.gif',
      icon:'mdi mdi-heart mdi-18px text-danger',
      title:'Skrrt Cobain Official',
      title2:'Liked by',
      name:'@ButterFly',
      time:'2 hours ago'
    },
    {
      image:'assets/images/items/2.jpg',
      icon:'mdi mdi-heart mdi-18px text-danger',
      title:'Wow! That Brain Is Floating',
      title2:'Liked by',
      name:'@ButterFly',
      time:'2 hours ago'
    },
    {
      image:'assets/images/items/3.jpg',
      icon:'mdi mdi-format-list-bulleted mdi-18px text-warning',
      title:'Our Journey Start',
      title2:'Liked by',
      name:'@CalvinCarlo',
      time:'5 hours ago'
    },
    {
      image:'assets/images/gif/2.gif',
      icon:'mdi mdi-heart mdi-18px text-danger',
      title:'BitBears',
      title2:'Liked by',
      name:'@ButterFly',
      time:'8 hours ago'
    },
    {
      image:'assets/images/items/4.jpg',
      icon:'mdi mdi-heart mdi-18px text-danger',
      title:'Little Kokeshi #13',
      title2:'Liked by',
      name:'@ButterFly',
      time:'1 hours ago'
    },
    {
      image:'assets/images/gif/3.gif',
      icon:'mdi mdi-account-check mdi-18px text-success',
      title:'EVOL Floater',
      title2:'Started Following',
      name:'@CutieGirl',
      time:'13 hours ago'
    },
    {
      image:'assets/images/gif/4.gif',
      icon:'mdi mdi-format-list-bulleted mdi-18px text-warning',
      title:'Smart Ape Club (SAC) - Limited Edition',
      title2:'Listed by',
      name:'@CalvinCarlo',
      time:'18 hours ago'
    },
    {
      image:'assets/images/gif/5.gif',
      icon:'mdi mdi-format-list-bulleted mdi-18px text-warning',
      title:'THE SECRET SOCIETY XX #775',
      title2:'Listed by',
      name:'@CalvinCarlo',
      time:'23 hours ago'
    },
    {
      image:'assets/images/items/5.jpg',
      icon:'mdi mdi-heart mdi-18px text-danger',
      title:'Create Your Own World',
      title2:'Liked by',
      name:'@ButterFly',
      time:'24 hours ago'
    },
  ]


  followers = [
    {
      image:'assets/images/client/02.jpg',
      name:'CutieGirl',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/items/1.jpg','assets/images/items/2.jpg','assets/images/gif/3.gif','assets/images/items/4.jpg','assets/images/items/5.jpg','assets/images/gif/4.gif'
      ]
    },
    {
      image:'assets/images/client/13.jpg',
      name:'FunnyGuy',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/items/3.jpg','assets/images/gif/1.gif','assets/images/items/9.jpg','assets/images/items/6.jpg','assets/images/items/1.jpg','assets/images/gif/2.gif'
      ]
    },
    {
      image:'assets/images/client/03.jpg',
      name:'NorseQueen',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/gif/5.gif','assets/images/items/2.jpg','assets/images/gif/6.gif','assets/images/items/4.jpg','assets/images/items/5.jpg'
      ]
    },
    {
      image:'assets/images/client/04.jpg',
      name:'BigBull',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/items/7.jpg','assets/images/items/8.jpg','assets/images/gif/9.gif','assets/images/items/10.jpg'
      ]
    },
    {
      image:'assets/images/client/10.jpg',
      name:'KristyHoney',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/items/1.jpg','assets/images/items/2.jpg','assets/images/items/3.jpg','assets/images/items/4.jpg','assets/images/items/5.jpg','assets/images/items/6.jpg'
      ]
    },
    {
      image:'assets/images/client/12.jpg',
      name:'Princess',
      location:'Brookfield, WI',
      subImage:[
        'assets/images/items/5.jpg','assets/images/items/8.jpg','assets/images/items/4.jpg','assets/images/items/7.jpg','assets/images/items/5.jpg','assets/images/items/10.jpg'
      ]
    },
  ]

  image:any = ''
  
  loadFile(event:any){
    this.image = document.getElementById(event.target.name);
    this.image.src = URL.createObjectURL(event.target.files[0]);
  }
}
