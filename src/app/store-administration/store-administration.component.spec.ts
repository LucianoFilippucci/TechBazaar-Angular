import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAdministrationComponent } from './store-administration.component';

describe('StoreAdministrationComponent', () => {
  let component: StoreAdministrationComponent;
  let fixture: ComponentFixture<StoreAdministrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreAdministrationComponent]
    });
    fixture = TestBed.createComponent(StoreAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
