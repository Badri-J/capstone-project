import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Service/log.service';
import { Log } from 'src/app/interfaces/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(private logService:LogService){}
  startDate!:Date;
  endDate!:Date;
  dateToday:Date = new Date( new Date().toJSON().slice(0,10).replace(/-/g,'/') );
  logs:Log[] = [];
  getLogList(s:Date,e:Date){
    this.logService.getLogs(s,e).subscribe(
      (response:any) => {
        this.logs = response
        console.log(this.logs)
      }
    )
  }
}
