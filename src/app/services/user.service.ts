
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  processLogin(id: string) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/verifyUser', {
      params: param
    });
  }
  createUser(name: any, photoUrl: any, provider: any, emailId: any, aboutMe: any) {
    return this.http.post(environment.appBaseUrl + '/createUser', { name, photoUrl, provider, emailId, aboutMe })
  }
  createPost(title: string, content: string, userId: any, name: string) {
    let createdBy = {
      userId: userId, name: name
    }
    return this.http.post(environment.appBaseUrl + '/createPost', { title, content, createdBy: createdBy })
  }

  getUsersPost(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/posts', {
      params: param
    })
  }

  getUsersToFollow(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/exceptCurrentUser', {
      params: param
    })
  }

  followUser(usrId: any, toFollowId: any, toFollowName: any) {
    return this.http.post(environment.appBaseUrl + '/follow', { usrId, toFollowId, toFollowName })
  }

  followingList(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/followingList', {
      params: param
    })
  }
}
