import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnCarouselComponent } from './column-carousel.component';

describe('ColumnCarouselComponent', () => {
  let component: ColumnCarouselComponent;
  let fixture: ComponentFixture<ColumnCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
