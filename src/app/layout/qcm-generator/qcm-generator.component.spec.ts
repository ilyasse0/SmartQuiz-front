import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmGeneratorComponent } from './qcm-generator.component';

describe('QcmGeneratorComponent', () => {
  let component: QcmGeneratorComponent;
  let fixture: ComponentFixture<QcmGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QcmGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
