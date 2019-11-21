import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GlobalService]
})
export class HomeComponent implements OnInit {
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
