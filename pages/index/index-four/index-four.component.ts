import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CreatorOneComponent } from '../../../components/creator/creator-one/creator-one.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProductOneComponent } from '../../../components/product/product-one/product-one.component';

import CollectionData from '../../../data/collection.json'
import { SelectFormComponent } from '../../../components/select-form/select-form.component';

@Component({
  selector: 'app-index-four',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CreatorOneComponent,FooterComponent,ProductOneComponent, SelectFormComponent],
  templateUrl: './index-four.component.html',
  styleUrl: './index-four.component.scss'
})
export class IndexFourComponent {

  collectionData = CollectionData

}
