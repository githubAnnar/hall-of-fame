import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.verify();
    console.log('isLoggedIn', this.isLoggedIn);
  }
}
