import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ContactUsComponent } from '../../../components/contact-us/contact-us.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-helpcenter-support-request',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ContactUsComponent, FooterComponent],
  templateUrl: './helpcenter-support-request.component.html',
  styleUrl: './helpcenter-support-request.component.scss'
})
export class HelpcenterSupportRequestComponent {

}
