import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFormatingComponent } from './example-formating.component';

describe('ExampleFormatingComponent', () => {
  let component: ExampleFormatingComponent;
  let fixture: ComponentFixture<ExampleFormatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleFormatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleFormatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
