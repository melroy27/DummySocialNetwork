import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData: any
  constructor() { }

  getUserData() {
    return this.userData
  }

  setUserData(userData: any) {
    this.userData = userData
  }

  deleteUserData() {
    this.userData = undefined
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  setUserInfo(data: any) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  getUserInfo() {
    return localStorage.getItem('userInfo')
  }
  deleteUserInfo() {
    localStorage.removeItem('userInfo');
  }
}
