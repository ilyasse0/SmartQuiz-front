import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmAttemptComponent } from './qcm-attempt.component';

describe('QcmAttemptComponent', () => {
  let component: QcmAttemptComponent;
  let fixture: ComponentFixture<QcmAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QcmAttemptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
