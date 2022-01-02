import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../core/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.tokenStorage.signOut();

    
  }

}
