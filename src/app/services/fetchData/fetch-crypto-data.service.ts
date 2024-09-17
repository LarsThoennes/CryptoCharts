import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchCryptoDataService {

  private coinsSubject = new BehaviorSubject<any[]>([]);
  public coins$ = this.coinsSubject.asObservable();

  private SingleCoinSubject = new BehaviorSubject<any[]>([]);
  public singleCoin$ = this.SingleCoinSubject.asObservable();

  options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'coinrankingeb333fa8585ac8c68d98585efc91be873799be3697d91d49',
    },
  };

  async loadBig50() {
    try {
      const response = await fetch('https://api.coinranking.com/v2/coins?timePeriod=12h', this.options);
      const result = await response.json();
      this.coinsSubject.next(result.data.coins); 
      console.log(result.data.coins);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async loadCoinView(uuid: any) {
    try {
      const response = await fetch(`https://api.coinranking.com/v2/coin/${uuid}`, this.options);
      const result = await response.json();
      this.SingleCoinSubject.next(result.data.coin); 
      console.log(result);
      localStorage.setItem('coin', uuid)
    } catch (error) {
      console.error(error);
    }
  }
}
