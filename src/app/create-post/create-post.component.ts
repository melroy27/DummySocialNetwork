import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  })
  userData: any
  userInfo: any
  constructor(public dataSrv: DataService,
    public usrService: UserService,
    private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.userData = this.dataSrv.getUserData();
    this.userInfo = this.dataSrv.getUserInfo();
    this.userInfo = JSON.parse(this.userInfo)
  }

  /**
   * Method to create a new post
   */
  createPost() {
    let title = this.postForm.controls.title.value
    let content = this.postForm.controls.content.value
    this.usrService.createPost(title, content, this.userInfo._id, this.userInfo.name).subscribe((res: any) => {
      console.log(res);
      if (res['status'] == true) {
        this.router.navigateByUrl('/home')
      } else {
        console.log('Some problem when creating a post', res.status);
      }
    })
  }
}
