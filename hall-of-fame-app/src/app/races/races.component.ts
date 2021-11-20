import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  title: string | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log("Inside RacesComponent");
    this.title="Races";
  }
}
