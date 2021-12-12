import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRevisionAddComponent } from './person-revision-add.component';

describe('PersonRevisionAddComponent', () => {
  let component: PersonRevisionAddComponent;
  let fixture: ComponentFixture<PersonRevisionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRevisionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRevisionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
