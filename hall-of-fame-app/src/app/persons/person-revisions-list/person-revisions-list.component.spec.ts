import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRevisionsListComponent } from './person-revisions-list.component';

describe('PersonRevisionsListComponent', () => {
  let component: PersonRevisionsListComponent;
  let fixture: ComponentFixture<PersonRevisionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRevisionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRevisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
