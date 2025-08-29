import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsPreviewComponent } from './tts-preview.component';

describe('TtsPreviewComponent', () => {
  let component: TtsPreviewComponent;
  let fixture: ComponentFixture<TtsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
