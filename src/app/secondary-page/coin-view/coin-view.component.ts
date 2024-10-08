import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FetchCryptoDataService } from '../../services/fetchData/fetch-crypto-data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-coin-view',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './coin-view.component.html',
  styleUrls: ['./coin-view.component.scss'],
  providers: [DatePipe]
})
export class CoinViewComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private fetchService: FetchCryptoDataService, private datePipe: DatePipe) {}

  coin: any = {};
  subscription!: Subscription;
  todayChange: boolean = false;
  date: any;
  chartColor: any

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: this.createGradient(), 
          font: {
            size: 14,
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: this.createGradient(), 
          font: {
            size: 12,
          }
        }
      },
      y: {
        ticks: {
          color: this.createGradient(), 
          font: {
            size: 12,
          }
        }
      }
    }
  };
  
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Coin Price',
        borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: this.createGradient(),
        fill: true,
      }
    ]
  };
  

  public lineChartType: 'line' = 'line';

  ngOnInit() {
    this.loadCoinData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCoinData() {
    const coinID = localStorage.getItem('coin');
    if (coinID) {
      this.fetchService.loadCoinView(coinID);
      this.subscription = this.fetchService.singleCoin$.subscribe((singleCoin) => {
        this.coin = singleCoin;
        console.log(this.coin);
        this.chartColor = this.coin.color || 'rgba(0, 123, 255, 1)'
        this.getATHDate(this.coin);
        this.updateChartData(this.coin);
        if (this.chart) {
          this.chart.update(); 
        }
      });
      this.checkChangeToday();
    }
  }

  checkChangeToday() {
    this.todayChange = this.coin.change >= 0;
  }

  getATHDate(coins: any) {
    if (coins && coins.allTimeHigh && coins.allTimeHigh.timestamp) {
      const unixTimestamp = coins.allTimeHigh.timestamp;
      const date = new Date(unixTimestamp * 1000);
      this.date = this.datePipe.transform(date, 'dd.MM.yyyy');
    } else {
      console.warn('allTimeHigh or timestamp is undefined');
    }
  }

  updateChartData(coin: any) {
    this.lineChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          label: '24h price',
          borderColor: this.chartColor || 'rgba(0, 123, 255, 1)',
          backgroundColor: this.createGradient(), 
          fill: true,
        }
      ]
    };
  
    if (coin && coin.sparkline) {
      const filteredSparkline = coin.sparkline
        .filter((value: any) => value !== null)
        .map((value: any) => parseFloat(value));
  
      this.lineChartData.labels = filteredSparkline.map((_: any, index: number) => `${index + 1}`);
      this.lineChartData.datasets[0].data = filteredSparkline;
    }
  }
  
  createGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return 'rgba(0, 123, 255, 0.2)';
    }
    const gradient = ctx.createLinearGradient(0, 100, 0, 1000);
    gradient.addColorStop(0, this.chartColor || 'rgba(0, 123, 255, 0.5)'); 
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); 
    return gradient;
  }
}
