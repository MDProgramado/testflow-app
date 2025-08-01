import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HomeComponentComponent } from './home-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


import { TaskServiceService } from '../../Services/task-service.service'; 
import { provideToastr } from 'ngx-toastr';

describe('HomeComponentComponent', () => {
  let component: HomeComponentComponent;
  let fixture: ComponentFixture<HomeComponentComponent>;
  let taskService: TaskServiceService; 


  const activatedRouteMock = {
    queryParamMap: of({ get: (key: string) => null })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponentComponent, HttpClientTestingModule],
      providers: [
        provideToastr(),
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponentComponent);
    component = fixture.componentInstance;
    
    taskService = TestBed.inject(TaskServiceService);
    
 
  });

  it('should create', () => {
    
    spyOn(taskService, 'getAll').and.returnValue(of([]));
    spyOn(taskService, 'checkTaskDeadLines'); 


    fixture.detectChanges();


    expect(component).toBeTruthy();
  });
});