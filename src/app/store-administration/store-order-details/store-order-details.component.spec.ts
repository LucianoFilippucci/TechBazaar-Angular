import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderDetailsComponent } from './store-order-details.component';

describe('StoreOrderDetailsComponent', () => {
  let component: StoreOrderDetailsComponent;
  let fixture: ComponentFixture<StoreOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(StoreOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
