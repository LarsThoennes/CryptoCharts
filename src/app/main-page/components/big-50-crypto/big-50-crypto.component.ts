import { Component, OnInit, ɵIMAGE_CONFIG } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchCryptoDataService } from '../../../services/fetchData/fetch-crypto-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-big-50-crypto',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './big-50-crypto.component.html',
  styleUrls: ['./big-50-crypto.component.scss'],
  providers: [
    {
      provide: ɵIMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ]
})
export class Big50CryptoComponent implements OnInit {

  constructor(private router: Router, private fetchService: FetchCryptoDataService) {}

  coins: any[] = [];
  subscription!: Subscription;

  async ngOnInit() {
    this.subscription = this.fetchService.coins$.subscribe((coins) => {
      this.coins = coins;
      console.log(this.coins);
    });

    this.fetchService.loadBig50();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async openCrypto(uuid: any) {
    this.router.navigate(['CoinView']);
    this.fetchService.loadCoinView(uuid)
  }
  
}
