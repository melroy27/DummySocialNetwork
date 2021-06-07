import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  loggedIn: any;

  constructor(private authService: SocialAuthService,
    private router: Router,
    public usrService: UserService,
    public dataSrv: DataService) { }

  ngOnInit() {
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      res => {
        console.log('User Data is ->', res);
        this.dataSrv.setUserData(res);
        this.usrService.processLogin(res.email).subscribe((response: any) => {
          if (response['status'] === true) {
            this.dataSrv.setUserInfo(response.userInfo)
            this.router.navigateByUrl('/home')
          } else if (response['status'] === false) {
            this.router.navigateByUrl('/profile')
          }
        })
      },
      err => {
        console.log(err);
      }
    );

  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      res => {
        console.log(res);
        // this.usrService.processLogin(res).subscribe(res => {
        //   if (res == true) {
        //     // this.router.navigateByUrl('/home')
        //   } else {
        //     // this.router.navigateByUrl('/profile')
        //   }
        // })
      }, err => {

      }
    )
  }

}
