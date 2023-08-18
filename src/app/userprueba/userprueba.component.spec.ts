import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpruebaComponent } from './userprueba.component';

describe('UserpruebaComponent', () => {
  let component: UserpruebaComponent;
  let fixture: ComponentFixture<UserpruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
