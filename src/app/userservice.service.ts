import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) 
  {

    
  }
  getUserData(username:number,password:String)
    {
      return this.http.get('http://localhost:8085/user/'+username+'/'+password);
    }
}
