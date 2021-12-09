import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRevisionAddComponent } from './club-revision-add.component';

describe('ClubRevisionAddComponent', () => {
  let component: ClubRevisionAddComponent;
  let fixture: ComponentFixture<ClubRevisionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubRevisionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubRevisionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
