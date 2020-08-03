import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {BackendApisService} from '../../services/backend-apis.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  users: any[];
  user: User = {
    userName: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  };

  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendApisService, private route: Router) {
  }

  @ViewChild('todoForm', null) form: any;

  ngOnInit() {
  }


  createNewUser(f) {
    const {userName, userEmail, userPassword} = this.user;

    const userData = {userName, userEmail, userPassword};

    this.apiServices.addNewUser(userData).subscribe((response: any) => {
      this.showSucessMessage = response.status.message;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.resetForm(f);
    }, err => {
      this.serverErrorMessages = err.error.response;
      setTimeout(() => this.serverErrorMessages = false, 4000);
    });
  }


  resetForm(form: NgForm) {
    this.user = {
      userName: '',
      userEmail: '',
      userPassword: ''
    };
    form.resetForm();
  }


}
