import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit(){
    this.updatePwa();
  }

  updatePwa() {
    this.swUpdate.available.subscribe(value => {
      console.log('Update PWA: ' + value);
      window.location.reload();
    });
  }
}
