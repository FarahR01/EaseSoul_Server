import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BlogsComponent } from '../../components/blogs/blogs.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent,BlogsComponent, CountUpModule, FooterComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})

export class AboutusComponent {

  teamData = [
    {
      image:'assets/images/client/01.jpg',
      name:'Calvin Carlo',
      possition:'Designer'
    },
    {
      image:'assets/images/client/02.jpg',
      name:'Aliana Rosy',
      possition:'Designer'
    },
    {
      image:'assets/images/client/03.jpg',
      name:'Micheal Carlo',
      possition:'Designer'
    },
    {
      image:'assets/images/client/04.jpg',
      name:'Sofia Razaq',
      possition:'Designer'
    },
    {
      image:'assets/images/client/05.jpg',
      name:'Jack John',
      possition:'Designer'
    },
    {
      image:'assets/images/client/06.jpg',
      name:'Krista John',
      possition:'Designer'
    },
    {
      image:'assets/images/client/07.jpg',
      name:'Roger Jackson',
      possition:'Designer'
    },
    {
      image:'assets/images/client/08.jpg',
      name:'Johnny English',
      possition:'Designer'
    },
  ]

}
