
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  processLogin(emailId: any) {
    return this.http.post(environment.appBaseUrl + '/check', emailId);
  }
}
