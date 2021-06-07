import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;
  about = new FormControl('');
  constructor(public dataSrv: DataService,
    public usrService: UserService,
    private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.userData = this.dataSrv.getUserData();
  }

  /**
   * method to create a new user's info
   */
  saveUser() {
    this.usrService.createUser(this.userData.name, this.userData.photoUrl, this.userData.provider, this.userData.email, this.about.value).subscribe((res: any) => {
      if (res['status'] === true) {
        console.log(res);
        this.dataSrv.setUserInfo(res.userInfo)
        this.dataSrv.setToken(this.userData.idToken)
        this.router.navigateByUrl('/home')
      } else {
        this.router.navigateByUrl('/')
      }
    })
  }
}
