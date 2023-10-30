import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:8080/software/"
  
  public getSoftware(id:string){
    return this.http.get(`${this.baseURL}getSoftware/${id}`)
  }

  public getAllSoftwares(){
    return this.http.get(`${this.baseURL}getAllSoftwares`)
  }

  public addSoftwares(details:any,n:number){
    return this.http.post(`${this.baseURL}addSoftwares/${n}`,details)
  }
  
  public updateSoftware(details:any){
    return this.http.put(`${this.baseURL}updateSoftware`,details)
  }

  public deleteSoftware(id:string){
    return this.http.delete(`${this.baseURL}deleteSoftware/${id}`)
  }

  public getSoftwareNames(){
    return this.http.get(`${this.baseURL}getSoftwareNames`) 
  }

  public getUnassignedSoftwares(){
    return this.http.get(`${this.baseURL}getUnAssignedSoftwares`) 
  }

  getUnLicensedSoftwares(){
    return this.http.get(`${this.baseURL}getUnLicensedSoftwares`) 
  }

  public getLicense(id:string){
    return this.http.get(`${this.baseURL}getLicense/${id}`)
  }

}
