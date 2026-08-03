import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoPheDuyetComponent } from './cho-phe-duyet.component';

describe('ChoPheDuyetComponent', () => {
  let component: ChoPheDuyetComponent;
  let fixture: ComponentFixture<ChoPheDuyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoPheDuyetComponent]
    });
    fixture = TestBed.createComponent(ChoPheDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
