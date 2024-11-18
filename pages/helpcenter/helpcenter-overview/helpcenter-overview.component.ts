import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AccordianComponent } from '../../../components/accordian/accordian.component';
import { ContactUsComponent } from '../../../components/contact-us/contact-us.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-helpcenter-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, AccordianComponent, ContactUsComponent, FooterComponent],
  templateUrl: './helpcenter-overview.component.html',
  styleUrl: './helpcenter-overview.component.scss'
})
export class HelpcenterOverviewComponent {
  aboutData = [
    {
      icon:'uil uil-question-circle',
      title:'FAQs',
      link:'/helpcenter-faqs',
      desc:'Due to its widespread use as filler text for layouts, non-readability is of great importance.'
    },
    {
      icon:'uil uil-file-bookmark-alt',
      title:'Guides / Support',
      link:'/helpcenter-guides',
      desc:'Due to its widespread use as filler text for layouts, non-readability is of great importance.'
    },
    {
      icon:'uil uil-cog',
      title:'Support Request',
      link:'/helpcenter-support-request',
      desc:'Due to its widespread use as filler text for layouts, non-readability is of great importance.'
    },
  ]
}
