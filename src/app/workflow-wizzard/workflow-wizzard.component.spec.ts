import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowWizzardComponent } from './workflow-wizzard.component';

describe('WorkflowWizzardComponent', () => {
  let component: WorkflowWizzardComponent;
  let fixture: ComponentFixture<WorkflowWizzardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowWizzardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowWizzardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
