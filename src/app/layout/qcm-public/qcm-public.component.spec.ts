import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmPublicComponent } from './qcm-public.component';

describe('QcmPublicComponent', () => {
  let component: QcmPublicComponent;
  let fixture: ComponentFixture<QcmPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QcmPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
