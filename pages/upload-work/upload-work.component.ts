import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-upload-work',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './upload-work.component.html',
  styleUrl: './upload-work.component.scss'
})
export class UploadWorkComponent {
  image:any = ''
  
  loadFile(event:any){
    this.image = document.getElementById(event.target.name);
    this.image = URL.createObjectURL(event.target.files[0]);
  }
}
