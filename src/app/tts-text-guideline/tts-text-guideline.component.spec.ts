import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsTextGuidelineComponent } from './tts-text-guideline.component';

describe('TtsTextGuidelineComponent', () => {
  let component: TtsTextGuidelineComponent;
  let fixture: ComponentFixture<TtsTextGuidelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtsTextGuidelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsTextGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
