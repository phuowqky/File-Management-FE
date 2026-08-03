import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoCuaToiComponent } from './ho-so-cua-toi.component';

describe('HoSoCuaToiComponent', () => {
  let component: HoSoCuaToiComponent;
  let fixture: ComponentFixture<HoSoCuaToiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoSoCuaToiComponent]
    });
    fixture = TestBed.createComponent(HoSoCuaToiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
