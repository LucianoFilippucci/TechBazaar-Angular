import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrdersComponent } from './store-orders.component';

describe('StoreOrdersComponent', () => {
  let component: StoreOrdersComponent;
  let fixture: ComponentFixture<StoreOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreOrdersComponent]
    });
    fixture = TestBed.createComponent(StoreOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
