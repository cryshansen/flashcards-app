import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCuesGuidelineComponent } from './visual-cues-guideline.component';

describe('VisualCuesGuidelineComponent', () => {
  let component: VisualCuesGuidelineComponent;
  let fixture: ComponentFixture<VisualCuesGuidelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualCuesGuidelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualCuesGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
