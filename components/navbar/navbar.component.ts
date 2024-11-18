import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, Injectable, } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons';
import {NgClickOutsideDirective} from 'ng-click-outside2';
import Web3 from 'web3';



declare let window: any;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClickOutsideDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  private web3: any;

  metaModal: boolean = false;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.warn('MetaMask not detected!');
      // Fallback to Infura or other provider
      // this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
    }
  }

  async requestAccounts() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      this.metaModal = true
    }
  }
  closeMeta(){
    this.metaModal = false;
  }

  async getSelectedAddress() {
    return await this.web3.eth.getCoinbase();
  }

  async sendTransaction(to: string, value: number) {
    const accounts = await this.web3.eth.getAccounts();
    const from = accounts[0];
    return await this.web3.eth.sendTransaction({ from, to, value });
  }

  @Input() navLight: any;
  @Input() bgGradiant:any;

  ngAfterViewInit() {
    feather.replace();
  }

  scrolled: boolean = false;

  @HostListener("window:scroll", [])

  onWindowScroll() {
      this.scrolled = window.scrollY > 0;
  }

  showToggleMenu:boolean = false

  toggleMenu(){
    this.showToggleMenu = !this.showToggleMenu
  }

  currentUrl:string = ''
  subManu:string = ''

  ngOnInit(): void {
    this.currentUrl = window.location.pathname
    window.scrollTo(0, 0);
    
  }

  openSubManu(item:string){
      this.subManu = item
  }


  // search dropdowns 
  setSearch:boolean = false

  setSearchDropdown(){
    this.setSearch = !this.setSearch
  }
  outsideSearch(e: Event) {
    this.setSearch = false
  }

  // user dropdown 
  setUser:boolean = false

  setUserDropdown(){
    this.setUser = !this.setUser
  }
  outsideUser(e: Event) {
    this.setUser = false
  }
}

