import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import CollectionData from '../../data/collection.json'

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [ CommonModule, RouterLink, NavbarComponent, FooterComponent ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {

  collectionData = CollectionData;

}
