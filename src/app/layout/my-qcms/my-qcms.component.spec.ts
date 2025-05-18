import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQcmsComponent } from './my-qcms.component';

describe('MyQcmsComponent', () => {
  let component: MyQcmsComponent;
  let fixture: ComponentFixture<MyQcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyQcmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyQcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
