import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCardsComponent } from './interview-cards.component';

describe('InterviewCardsComponent', () => {
  let component: InterviewCardsComponent;
  let fixture: ComponentFixture<InterviewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
