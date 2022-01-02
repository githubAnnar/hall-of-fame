import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../core/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.currentUser = this.token.getUser();
    }
    else {
      window.location.href = "login";
    }
  }
}
