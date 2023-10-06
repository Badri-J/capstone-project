import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private http:HttpClient) { }

  private baseURL = 'http://localhost:8080/employee/'

  signUp(form:any){
    return this.http.post(`${this.baseURL}signUp`, form)
  }

  login(userID:string,password:string){
    return this.http.get(`${this.baseURL}login/${userID}/${password}`)
  }

}
