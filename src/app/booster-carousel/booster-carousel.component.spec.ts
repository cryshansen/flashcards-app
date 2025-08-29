import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoosterCarouselComponent } from './booster-carousel.component';

describe('BoosterCarouselComponent', () => {
  let component: BoosterCarouselComponent;
  let fixture: ComponentFixture<BoosterCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoosterCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoosterCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
