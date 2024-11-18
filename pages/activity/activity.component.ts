import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  activity = [
   
    {
      image:'assets/images/items/5.jpg',
      title:'Create Your Own World',
      title2:'Liked by',
      name:'@ButterFly',
      time:'24 hours ago',
      icon:'mdi mdi-format-list-bulleted mdi-18px text-warning mdi-18px text-warning'
    },
  ]

  filters = [
    
    {
      icon:'uil uil-illustration',
      title:'Illustration'
    },
  ]
}
