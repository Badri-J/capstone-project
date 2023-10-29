import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseURL:string = "http://localhost:8080/log/"
  constructor(private http:HttpClient) { }
  getLogs(startDate:Date, endDate:Date){
    return this.http.get(`${this.baseURL}getLogs/${startDate}/${endDate}`)
  }
}
