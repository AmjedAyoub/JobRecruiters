import { Component, OnInit } from '@angular/core';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JobRec';
  constructor(private dataService: DataService){}

  ngOnInit() {
    this.dataService.getData();
    this.dataService.getAllData();
  }
}
