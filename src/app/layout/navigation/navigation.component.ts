import {Component, OnInit} from '@angular/core';
import {BackendApisService, UserDetails} from '../../services/backend-apis.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userName: any;

  constructor(public apiServices: BackendApisService) {
    this.userName = this.apiServices.getUserName();
  }

  ngOnInit() {

  }

}


