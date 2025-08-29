import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesDrawerComponent } from './guidelines-drawer.component';

describe('GuidlinesDrawerComponent', () => {
  let component: GuidelinesDrawerComponent;
  let fixture: ComponentFixture<GuidelinesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidelinesDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidelinesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
