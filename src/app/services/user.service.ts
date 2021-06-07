
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * enpoin to verify the user
   * @param id
   * @returns
   */
  processLogin(id: string) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/verifyUser', {
      params: param
    });
  }

  /**
   * endpoint to create a user user
   * @param name
   * @param photoUrl
   * @param provider
   * @param emailId
   * @param aboutMe
   * @returns
   */
  createUser(name: any, photoUrl: any, provider: any, emailId: any, aboutMe: any) {
    return this.http.post(environment.appBaseUrl + '/createUser', { name, photoUrl, provider, emailId, aboutMe })
  }

  /**
   * endpoin to create a new post
   * @param title
   * @param content
   * @param userId
   * @param name
   * @returns
   */
  createPost(title: string, content: string, userId: any, name: string) {
    let createdBy = {
      userId: userId, name: name
    }
    return this.http.post(environment.appBaseUrl + '/createPost', { title, content, createdBy: createdBy })
  }

  /**
   * to display a users posts
   * @param id
   * @returns
   */
  getUsersPost(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/posts', {
      params: param
    })
  }

  /**
   * display potential users to follow
   * @param id
   * @returns
   */
  getUsersToFollow(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/exceptCurrentUser', {
      params: param
    })
  }

  /**
   * follow a user
   * @param usrId
   * @param toFollowId
   * @param toFollowName
   * @returns
   */
  followUser(usrId: any, toFollowId: any, toFollowName: any) {
    return this.http.post(environment.appBaseUrl + '/follow', { usrId, toFollowId, toFollowName })
  }

  /**
   * list of following users
   * @param id
   * @returns
   */
  followingList(id: any) {
    let param = {
      "id": id
    }
    return this.http.get(environment.appBaseUrl + '/followingList', {
      params: param
    })
  }
}
