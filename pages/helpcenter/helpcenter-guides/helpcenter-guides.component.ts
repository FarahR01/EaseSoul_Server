import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ContactUsComponent } from '../../../components/contact-us/contact-us.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-helpcenter-guides',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ContactUsComponent, FooterComponent],
  templateUrl: './helpcenter-guides.component.html',
  styleUrl: './helpcenter-guides.component.scss'
})
export class HelpcenterGuidesComponent {
  guidanceData = [
    {
      title:'Getting started',
      data:['Deciding to purchase', 'List your space', 'Landing an experience or adventure','Top uses questions']
    },
    {
      title:'Your calendar',
      data:['Pricing & availability', 'Booking settings', 'Responding to enquiries & requests','Snoozing or deactivating your listing']
    },
    {
      title:'Your listings',
      data:['Updating your listing', 'Neighbourhoods', 'Listing photos & photography','Superex Plus','API-connected software']
    },
    {
      title:'How payouts work',
      data:['Getting paid', 'Adding payout info', 'Your payout status','Donations', 'Taxes']
    },
    {
      title:'Your reservations',
      data:['Superex safely', 'Superex Experiences and Adventures', 'Changing a reservation','Cancelling a reservation','Long-term reservations']
    },
    {
      title:'Reservation help',
      data:['Help with a reservation or guest', 'Guest cancellations']
    },
    {
      title:'Your account',
      data:['Your profile', 'Account security', 'Identification & verifications','Reviews','uperhost status']
    },
  ]
}
