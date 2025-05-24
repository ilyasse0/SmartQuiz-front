import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmReviewComponent } from './qcm-review.component';

describe('QcmReviewComponent', () => {
  let component: QcmReviewComponent;
  let fixture: ComponentFixture<QcmReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QcmReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
