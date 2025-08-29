import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualHighlighterComponent } from './visual-highlighter.component';

describe('VisualHighlighterComponent', () => {
  let component: VisualHighlighterComponent;
  let fixture: ComponentFixture<VisualHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualHighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
