import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import Creatordata from '../../../data/creator.json'

@Component({
  selector: 'app-creator-two',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creator-two.component.html',
  styleUrl: './creator-two.component.scss'
})
export class CreatorTwoComponent {
  creatorData = Creatordata;

}
