import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = []
  userData: any;
  userInfo: any;
  usersToFollow: any;

  constructor(public dataSrv: DataService,
    public usrService: UserService,
    private router: Router, public fb: FormBuilder,
    private authService: SocialAuthService) {
  }
  ngOnInit() {
    this.userInfo = this.dataSrv.getUserInfo();
    this.userInfo = JSON.parse(this.userInfo)
  }

  ngAfterViewInit() {
    this.getUserPosts();
    this.getUsrToFollow();
  }
  /**
   * method to retrive a users posts
   */
  getUserPosts() {
    this.usrService.getUsersPost(this.userInfo?._id).subscribe((res: any) => {
      this.posts = res.posts
      console.log(this.posts)
    })
  }

  /**
   * Methods to display users to follow
   */
  getUsrToFollow() {
    this.usrService.getUsersToFollow(this.userInfo?._id).subscribe((res: any) => {
      console.log('Users other than the current user ->', res.users);
      this.usersToFollow = res.users
    })
  }

  /**
   * method to follow a user
   * @param id
   * @param name
   */
  followUser(id: any, name: string) {
    console.log(id);
    this.usrService.followUser(this.userInfo._id, id, name).subscribe(res => {
      console.log('Stats->', res)
    })
  }

  /**
   * method to open a new page
   */
  createPost() {
    this.router.navigateByUrl('/createPost')
  }

  /**
     * method to open a new page
     */
  followingList() {
    this.router.navigateByUrl('/listFollowing')
  }

  /**
   * method to sign out
   */
  signOut() {
    this.dataSrv.deleteToken();
    this.dataSrv.deleteUserData();
    this.dataSrv.deleteUserInfo();
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
