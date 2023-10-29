import { CSP_NONCE, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService{

  constructor(private http:HttpClient) { }

  private baseURL = 'http://localhost:8080/employee/'
  
  private loginState:string = "false";

  private employees:Employee[] = [];

  private loggedInEmployee!:Employee;

  getLoggedInEmployee():Employee{
    this.loggedInEmployee = JSON.parse(localStorage.getItem('loggedInEmployee')!)
    return this.loggedInEmployee;
  }

  setLoggedInEmployee(loggedInEmployee:Employee){
    this.loggedInEmployee = loggedInEmployee;
    localStorage.setItem('loggedInEmployee',JSON.stringify(loggedInEmployee))
  }

  setLoginState(loginState:string){
    this.loginState = loginState;
    localStorage.setItem('loginState',loginState)
  }

  getLoginState():string{
    this.loginState = localStorage.getItem('loginState')! 
    return this.loginState;
  }

  signUp(form:any){
    return this.http.post(`${this.baseURL}signUp`, form)
  }

  login(userID:string,password:string){
    return this.http.get(`${this.baseURL}login/${userID}/${password}`)
  }

  getByID(id:string){
    return this.http.get(`${this.baseURL}employeeByID/${id}`)
  }

  getByEmail(email:string){
    return this.http.get(`${this.baseURL}employeeByEmail/${email}`)
  }

  getEmployeesList(){
    return this.http.get(`${this.baseURL}getAllEmployees`)
  }

  updateStatus(id:string,status:string){
    return this.http.put(`${this.baseURL}updateStatus`,{'id':id, 'status':status})
  }

  updateEmployee(form:any){
    return this.http.put(`${this.baseURL}updateEmployee`,form)
  }

  deteteEmployee(id:string){
    return this.http.delete(`${this.baseURL}deleteEmployee/${id}`)
  }

  assignDevice(details:any){
    return this.http.post(`${this.baseURL}assignDevices`,details)
  }

  assignSoftware(details:any){
    return this.http.post(`${this.baseURL}assignSoftwares`,details)
  }

  getDevices(id:string){
    return this.http.get(`${this.baseURL}getDevices/${id}`)
  }

  getSoftwares(id:string){
    return this.http.get(`${this.baseURL}getSoftwares/${id}`)
  }

  getDashBoardCardDetails(){
    return this.http.get(`${this.baseURL}getAllDetails`)
  }

  forgotpassword(email1:any):Observable<object>{
    return this.http.get(`${this.baseURL}forgotpassword/${email1}`)
  }
  
  updatepassword(email:any,password:any){
    return this.http.put(`${this.baseURL}updatepassword/${email}/${password}`,{})
  }

  sendOtp(email:any){
    return this.http.get(`${this.baseURL}forgotpassword/${email}`)
  }

}
