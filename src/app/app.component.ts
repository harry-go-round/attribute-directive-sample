import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  sample1: string
  sample2: string
  sample3: { [key: string]: string }

  ngOnInit() {
    this.sample1 = 'ダブルクリックしてね！'
    this.sample2 = 'ダブルクリックしてね！!'
    this.sample3 = {
      1: '（´・ω・｀）',
      2: '（´・ω:;.:…',
      3: '（´:;….::;.:. :::;.. …..',
    }
  }

  sample3Change(key: string, e) {
    this.sample3[key] = e
  }
}
