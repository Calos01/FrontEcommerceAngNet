import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductopsComponent } from './productops.component';

describe('ProductopsComponent', () => {
  let component: ProductopsComponent;
  let fixture: ComponentFixture<ProductopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
