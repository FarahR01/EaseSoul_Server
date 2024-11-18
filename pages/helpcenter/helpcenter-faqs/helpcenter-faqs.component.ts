import { CommonModule } from '@angular/common';
import { Component, HostListener  } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AccordianComponent } from '../../../components/accordian/accordian.component';
import { ContactUsComponent } from '../../../components/contact-us/contact-us.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-helpcenter-faqs',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent,AccordianComponent,ContactUsComponent, FooterComponent],
  templateUrl: './helpcenter-faqs.component.html',
  styleUrl: './helpcenter-faqs.component.scss'
})
export class HelpcenterFaqsComponent {

  activeSectionId: string | null = null;

  id: string = '';

  divIds: string[] = ['getstart', 'policy', 'use', 'support'];

  @HostListener('window:scroll', ['$event'])

  onScroll(event:any) {
    this.checkVisibleDiv();
  }

  checkVisibleDiv() {
    const windowHeight = window.innerHeight;
    
    const divElements = document.querySelectorAll('.section-title');

    divElements.forEach(div => {
      const rect = div.getBoundingClientRect();
      const isVisible = (rect.top >= 0 && rect.bottom <= windowHeight);
      
      if (isVisible) {
        this.id = div.id;
      }
    });
  }

}
