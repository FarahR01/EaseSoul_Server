import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackToHomeComponent } from '../../../components/back-to-home/back-to-home.component';

@Component({
  selector: 'app-comingsoon',
  standalone: true,
  imports: [CommonModule, RouterLink, BackToHomeComponent],
  templateUrl: './comingsoon.component.html',
  styleUrl: './comingsoon.component.scss'
})
export class ComingsoonComponent {
  date:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.date = new Date().getFullYear()
  }
}
