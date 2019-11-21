import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ResolveStart } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService]
})
export class AppComponent implements OnInit{
  title = 'Doruk';

  resultModel :any;
  durations :any;
  reasons :any;
  reasonTotals :any;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.global.reqGet("/report/getdurations", null).subscribe((x: any) => {
        console.log(x);

        let resJSON = JSON.parse(x);
        this.resultModel = resJSON;
        this.durations = this.resultModel.Durations;
        this.reasons = this.resultModel.Reasons;
        this.reasonTotals=this.resultModel.ReasonTotal;
      });
  }
 }
