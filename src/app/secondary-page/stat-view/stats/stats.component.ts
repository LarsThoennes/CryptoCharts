import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchCryptoDataService } from '../../../services/fetchData/fetch-crypto-data.service';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit, OnDestroy {

  constructor(private fetchService: FetchCryptoDataService) {}

  stats: any = {};
  subscription!: Subscription;

  ngOnInit() {
      localStorage.setItem('timeStamp', '1y')
      const timestamp = localStorage.getItem('timeStamp')
      this.loadStats(timestamp)
      
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      localStorage.clear
    }
  }

  setTimeStamp(timeStamp: any) {
    localStorage.clear
    localStorage.setItem('timeStamp', timeStamp)
    const StorageTimeStamp = localStorage.getItem('timeStamp')
    this.loadStats(StorageTimeStamp)
  }

  loadStats(timeStamp:any) {
    if (timeStamp) {
      this.fetchService.visitCrypto(timeStamp);
      this.subscription = this.fetchService.coinStats$.subscribe((coinStats) => { 
        this.stats = coinStats;
        console.log(this.stats);
      });
    }

    this.ngOnDestroy()
  }
}
