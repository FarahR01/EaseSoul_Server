import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-form',
  standalone: true,
  imports: [NgSelectModule,FormsModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss'
})
export class SelectFormComponent {

  value1 = [
    { id: 1, name: 'Auction Product' },
    { id: 2, name: 'On Sale' },
    { id: 3, name: 'Offices' },
    { id: 4, name: 'Offers' },
  ]

  value2 = [
    {id: 1, name: 'Art'},
    {id: 2, name: 'Games'},
    {id: 3, name: 'Music'},
    {id: 4, name: 'Videos'},
    {id: 5, name: 'Memes'}
  ]

}
