import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubRevisionsListComponent } from './club-revisions-list.component';

describe('ClubRevisionsListComponent', () => {
  let component: ClubRevisionsListComponent;
  let fixture: ComponentFixture<ClubRevisionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubRevisionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubRevisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
