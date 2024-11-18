import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-become-creator',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './become-creator.component.html',
  styleUrl: './become-creator.component.scss'
})
export class BecomeCreatorComponent {
  image:any = ''
  
  loadFile(event:any){
    this.image = document.getElementById(event.target.name);
    this.image = URL.createObjectURL(event.target.files[0]);
    
  }
}
