import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 

import { TaskListComponentComponent } from './task-list-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskServiceService } from '../../Services/task-service.service';
import { Task } from '../../interfaces/Task'; 

describe('TaskListComponentComponent', () => {
  let component: TaskListComponentComponent;
  let fixture: ComponentFixture<TaskListComponentComponent>;
  let taskService: TaskServiceService;

 
  const activatedRouteMock = {
    queryParamMap: of({
      get: (key: string) => null 
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      imports: [TaskListComponentComponent, HttpClientTestingModule],
      providers: [
      
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponentComponent);
    component = fixture.componentInstance;
    
 
    taskService = TestBed.inject(TaskServiceService);
  });


  it('should create', () => {
  
    spyOn(taskService, 'getAll').and.returnValue(of([]));
    spyOn(taskService, 'checkTaskDeadLines'); 

    
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });


  it('should load tasks from the service on init', () => {
   
    const mockTasks: Task[] = [
      { id: '1', title: 'Test Task 1', description: 'Desc 1', status: 'Pendente', sector: 'Produção', responsible: 'John', dueDate: '2025-12-31', priority: 'Média' },
      { id: '2', title: 'Test Task 2', description: 'Desc 2', status: 'Concluída', sector: 'Manutenção', responsible: 'Jane', dueDate: '2025-12-31', priority: 'Alta' }
    ];

 
    spyOn(taskService, 'getAll').and.returnValue(of(mockTasks));
    spyOn(taskService, 'checkTaskDeadLines');
 
    fixture.detectChanges();


    expect(component.tasks.length).toBe(2);
    expect(component.filteredTasks.length).toBe(2);
    expect(component.tasks[0].title).toBe('Test Task 1');
    expect(taskService.checkTaskDeadLines).toHaveBeenCalled(); 
  });
});