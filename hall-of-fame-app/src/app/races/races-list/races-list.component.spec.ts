import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesListComponent } from './races-list.component';

describe('RacesListComponent', () => {
  let component: RacesListComponent;
  let fixture: ComponentFixture<RacesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
