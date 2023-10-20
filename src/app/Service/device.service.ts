import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  

  baseURL:String = "http://localhost:8080/device/" 

  constructor(private http:HttpClient) { }

  getDevice(id:string){
    return this.http.get(`${this.baseURL}getDevice/${id}`)
  }

  addDevice(deviceDetails:any,qty:number){
    return this.http.post(`${this.baseURL}addDevices/${qty}`,deviceDetails)
  }

  getAllDevices(){
    return this.http.get(`${this.baseURL}getAllDevices`)
  }

  getDeviceNames(){
    return this.http.get(`${this.baseURL}getDevicenames`)
  }

  updateDevice(detailsUpdate:any){
    return this.http.put(`${this.baseURL}updateDevice`,detailsUpdate)
  }

  deleteDevice(id:string){
    return this.http.delete(`${this.baseURL}deleteDevice/${id}`)
  }

  getUnAssignedDevices(){
    return this.http.get(`${this.baseURL}getUnAssignedDevices`)
  }

  public getLicense(id:string){
    return this.http.get(`${this.baseURL}getLicense/${id}`)
  }

}

