import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptSignUpComponent } from './dept-sign-up.component';

describe('DeptSignUpComponent', () => {
  let component: DeptSignUpComponent;
  let fixture: ComponentFixture<DeptSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
