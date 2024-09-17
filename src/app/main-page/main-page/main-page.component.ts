import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { Big50CryptoComponent } from '../components/big-50-crypto/big-50-crypto.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, LandingPageComponent, Big50CryptoComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  
}

