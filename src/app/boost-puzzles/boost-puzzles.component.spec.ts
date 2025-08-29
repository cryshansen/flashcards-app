import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostPuzzlesComponent } from './boost-puzzles.component';

describe('BoostPuzzlesComponent', () => {
  let component: BoostPuzzlesComponent;
  let fixture: ComponentFixture<BoostPuzzlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoostPuzzlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoostPuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
