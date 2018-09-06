import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitServiceErrorComponent } from './init-service-error.component';

describe('InitServiceErrorComponent', () => {
  let component: InitServiceErrorComponent;
  let fixture: ComponentFixture<InitServiceErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitServiceErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitServiceErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
