import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  baseURL:string= "http://localhost:8080/email/"

  getEmails(){
    return this.http.get(`${this.baseURL}getEmails`)
  }

  getEmail(id:string){
    return this.http.get(`${this.baseURL}getEmail/${id}`) 
  }

}
