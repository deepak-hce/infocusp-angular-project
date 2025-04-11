import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, switchMap } from 'rxjs';


interface CoinApiResponse {
  symbol: string; price: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'infocusp-angular-interview';
  btcPrice = "";
  ltcPrice = "";
  baseUrl = "https://api.binance.com/api/v3/ticker/price?symbol="
  TIMER = 1000

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {

    // Question 1 - Used Interval to call the API every second and updating the UI.

    interval(this.TIMER).pipe(
      switchMap(() => this.httpClient.get<CoinApiResponse>(`${this.baseUrl}LTCUSDT`))
    ).subscribe(response => {
      this.ltcPrice = response.price
    });

    interval(this.TIMER).pipe(
      switchMap(() => this.httpClient.get<CoinApiResponse>(`${this.baseUrl}BTCUSDT`))
    ).subscribe(response => {
      this.btcPrice = response.price
    });

    // Question 2 - Used Generic type parameter, in that way it can accept both string and number. 
    // But it requires a type assertion, so that compiler knows + operation can be performed on both string and number.
    // I tried with Function Overload appraoch as well but there also I will have to use type assertion as any.


    function add<T extends string | number>(a: T, b: T): T {
      return (a as any) + (b as any) as T;
    }

    console.log(add(1, 2))
    console.log(add("1", "2"))
  }
}
