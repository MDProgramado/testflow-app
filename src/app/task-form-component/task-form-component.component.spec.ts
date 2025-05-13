import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponentComponent } from './task-form-component.component';

describe('TaskFormComponentComponent', () => {
  let component: TaskFormComponentComponent;
  let fixture: ComponentFixture<TaskFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
