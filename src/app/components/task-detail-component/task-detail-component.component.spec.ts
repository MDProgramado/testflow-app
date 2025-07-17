import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailComponentComponent } from './task-detail-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('TaskDetailComponentComponent', () => {
  let component: TaskDetailComponentComponent;
  let fixture: ComponentFixture<TaskDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailComponentComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (id: string) => '123' } },
            paramMap: of({ get: (id: string) => '123' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
