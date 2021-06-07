import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-following',
  templateUrl: './list-following.component.html',
  styleUrls: ['./list-following.component.scss']
})
export class ListFollowingComponent implements OnInit {
  userList = []
  userInfo: any;
  constructor(public usrService: UserService,
    public dataSrv: DataService,
    private router: Router) { }

  ngOnInit() {
    this.userInfo = this.dataSrv.getUserInfo();
    this.userInfo = JSON.parse(this.userInfo)
    this.usrService.followingList(this.userInfo._id).subscribe((res: any) => {
      this.userList = res.list
    })
  }

  /**
     * method to open a new page
     */
  home() {
    this.router.navigateByUrl('/home')
  }

  /**
     * method to open a new page
     */
  createPost() {
    this.router.navigateByUrl('/createPost')
  }
}
