import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  modal:boolean = false

  onModalClick(event:any){
    event.preventDefault();
    this.modal = !this.modal
  }

  walletData = [
    {
      image:'assets/images/wallet/metamask-fox.png',
      bg:'bg-gradient-primary',
      name:'MetaMask',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:true
    },
    {
      image:'assets/images/wallet/aave.svg',
      bg:'bg-gradient-primary',
      name:'Aave',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/Airswap.svg',
      bg:'bg-gradient-warning',
      name:'Airswap',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/Compound.svg',
      bg:'bg-gradient-danger',
      name:'Compound',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/ddexsvg.svg',
      bg:'bg-gradient-info',
      name:'DDEX',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/defi-saver.svg',
      bg:'bg-gradient-primary',
      name:'Defi Saver',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/dYdX.svg',
      bg:'bg-gradient-primary',
      name:'DYDX',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/idex.svg',
      bg:'bg-gradient-warning',
      name:'IDEX',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/kyber.svg',
      bg:'bg-gradient-warning',
      name:'Kyber',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/maker.svg',
      bg:'bg-gradient-info',
      name:'Maker',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/nuo.svg',
      bg:'bg-gradient-primary',
      name:'NUO',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/PoolTogether.svg',
      bg:'bg-gradient-primary',
      name:'PoolTogether',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/sablier.svg',
      bg:'bg-gradient-warning',
      name:'Sablier',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/set.svg',
      bg:'bg-gradient-danger',
      name:'Set',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/uniswap.svg',
      bg:'bg-gradient-info',
      name:'Uniswap',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
    {
      image:'assets/images/wallet/zerion.svg',
      bg:'bg-gradient-secondary',
      name:'Zerion',
      desc:'Learn about how to get the wallet and much more clicking',
      tag:false
    },
  ]
}
