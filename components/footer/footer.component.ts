import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef  } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  date:any 

  ngOnInit(): void {
   this.date = new Date().getFullYear()
  }
  constructor(private el: ElementRef) { }

  topFunction(event: MouseEvent){
    event.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    scrolled: boolean = false;

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 0;
    }


  superex = [
    {
      name:'Explore',
      link:'/explore-two'
    },
    {
      name:'Live Auction',
      link:'/auction'
    },
    {
      name:'Activities',
      link:'/activity'
    },
    {
      name:'Wallet',
      link:'/wallet'
    },
    {
      name:'Creators',
      link:'/creators'
    },
  ]
  community = [
    {
      name:'About Us',
      link:'/aboutus'
    },
    {
      name:'Blog',
      link:'/blogs'
    },
    {
      name:'Terms & Conditions',
      link:'/terms'
    },
    {
      name:'Privacy Policy',
      link:'/privacy'
    },
    {
      name:'Login',
      link:'/login'
    },
    {
      name:'Contact',
      link:'/contact'
    },
  ]
}
