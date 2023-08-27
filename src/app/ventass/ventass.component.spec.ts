import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentassComponent } from './ventass.component';

describe('VentassComponent', () => {
  let component: VentassComponent;
  let fixture: ComponentFixture<VentassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
