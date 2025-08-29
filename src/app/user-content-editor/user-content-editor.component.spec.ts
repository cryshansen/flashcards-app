import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentEditorComponent } from './user-content-editor.component';

describe('UserContentEditorComponent', () => {
  let component: UserContentEditorComponent;
  let fixture: ComponentFixture<UserContentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserContentEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
