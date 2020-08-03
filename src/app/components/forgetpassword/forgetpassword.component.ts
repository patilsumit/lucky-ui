import {Component, OnInit} from '@angular/core';
import {BackendApisService} from '../../services/backend-apis.service';
import {User} from '../../model/User';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  user: User = {
    userEmail: ''
  };

  showSucessMessage: string;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendApisService, private route: Router) {
  }

  ngOnInit() {
    this.apiServices.logout();
    this.route.navigateByUrl('users/forget-password');
  }


  userForgetPassword(f) {

    this.apiServices.userForgetPassword(this.user).subscribe((response: any) => {
      this.showSucessMessage = 'Reset Link Sent your Registered Email Successfully';
      this.resetForm(f);
    }, error => {
      this.serverErrorMessages = error.error.response;
      setTimeout(() => this.serverErrorMessages = false, 4000);
    });
  }


  resetForm(form: NgForm) {
    this.user = {
      userEmail: '',

    };
    form.resetForm();
  }


}
