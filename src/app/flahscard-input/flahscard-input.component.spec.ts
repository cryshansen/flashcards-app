import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlahscardInputComponent } from './flahscard-input.component';

describe('FlahscardInputComponent', () => {
  let component: FlahscardInputComponent;
  let fixture: ComponentFixture<FlahscardInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlahscardInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlahscardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
