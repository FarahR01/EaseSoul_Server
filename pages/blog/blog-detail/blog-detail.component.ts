import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import BlogData from '../../../data/blog.json'

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {
  modal:boolean = false

  blogData = BlogData
  blogId:any
  data:any

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')
    this.data = this.blogData.find((item:any) => {
      return item.id == this.blogId
    })
    
  }

  onModalClick(event:any){
    
    event.preventDefault();
    
    this.modal = !this.modal
  }

}
