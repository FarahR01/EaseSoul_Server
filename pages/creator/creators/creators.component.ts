import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import Creatordata from '../../../data/creator.json'
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-creators',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './creators.component.html',
  styleUrl: './creators.component.scss'
})
export class CreatorsComponent {

  creatorData = Creatordata

}
