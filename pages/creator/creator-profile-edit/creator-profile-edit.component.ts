import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-creator-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './creator-profile-edit.component.html',
  styleUrl: './creator-profile-edit.component.scss'
})
export class CreatorProfileEditComponent {
  image:any = ''
  
  loadFile(event:any){
    this.image = document.getElementById(event.target.name);
    this.image.src = URL.createObjectURL(event.target.files[0]);
  }
}
