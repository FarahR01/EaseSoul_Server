import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
    data = [
      {
        icon:'uil uil-card-atm',
        title:'Set up your wallet',
        desc:'Start working with Superex NFTs that can provide everything'
      },
      {
        icon:'uil uil-bitcoin-circle',
        title:'Buy your collection',
        desc:'Start working with Superex NFTs that can provide everything'
      },
      {
        icon:'uil uil-wallet',
        title:'Add your NFTs',
        desc:'Start working with Superex NFTs that can provide everything'
      },
      {
        icon:'uil uil-layers',
        title:'Sell Your NFTs',
        desc:'Start working with Superex NFTs that can provide everything'
      },
    ]
}
