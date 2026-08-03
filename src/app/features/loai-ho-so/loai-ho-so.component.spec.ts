import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiHoSoComponent } from './loai-ho-so.component';

describe('LoaiHoSoComponent', () => {
  let component: LoaiHoSoComponent;
  let fixture: ComponentFixture<LoaiHoSoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaiHoSoComponent]
    });
    fixture = TestBed.createComponent(LoaiHoSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
