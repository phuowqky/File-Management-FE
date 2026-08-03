import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoDetailComponent } from './ho-so-detail.component';

describe('HoSoDetailComponent', () => {
  let component: HoSoDetailComponent;
  let fixture: ComponentFixture<HoSoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoSoDetailComponent]
    });
    fixture = TestBed.createComponent(HoSoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
