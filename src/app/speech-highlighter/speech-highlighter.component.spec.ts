import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechHighlighterComponent } from './speech-highlighter.component';

describe('SpeechHighlighterComponent', () => {
  let component: SpeechHighlighterComponent;
  let fixture: ComponentFixture<SpeechHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechHighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
