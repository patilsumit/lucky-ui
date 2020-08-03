import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {BackendApisService} from '../../services/backend-apis.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {
    userEmail: '',
    userPassword: '',
  };
  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendApisService, public route: Router) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.apiServices.userLogin(this.user).subscribe(
      (res: any) => {
        
        this.showSucessMessage = true;
        
        this.apiServices.saveToken(res.response.token);
        this.apiServices.saveUserName(res.response.userName);
        this.route.navigateByUrl('/users/home');
      },
      err => {
        this.serverErrorMessages = err.error.response;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      }
    );
  }

}
