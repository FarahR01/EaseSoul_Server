import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import CreatorData from '../../../data/creator.json'

@Component({
  selector: 'app-creator-three',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './creator-three.component.html',
  styleUrl: './creator-three.component.scss'
})
export class CreatorThreeComponent {

  creatorData = CreatorData

}
