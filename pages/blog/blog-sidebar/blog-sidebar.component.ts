import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import BlogData from '../../../data/blog.json'

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [ CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss'
})

export class BlogSidebarComponent {
  blogData = BlogData;
 

  recentBlog = [
    {
      image:'assets/images/blog/01.jpg',
      title:'Consultant Business',
      date:'19th June 2025'
    },
    {
      image:'assets/images/blog/02.jpg',
      title:'Grow Your Business',
      date:'20th June 2025'
    },
    {
      image:'assets/images/blog/03.jpg',
      title:'Look On The Glorious Balance',
      date:'1st September 2025'
    },
  ]

  tag = [
    'Business', 'Finance', 'Marketing', 'Fashion', 'Bride', 'Lifestyle', 'Travel', 'Beauty', 'Video', 'Audio'
  ]
}
