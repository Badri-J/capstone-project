import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private http:HttpClient) { }

  private signUpURL = 'http://localhost:8080/employee/signUp'

  signUp(form:any){
    return this.http.post(this.signUpURL, form)
  }
}
