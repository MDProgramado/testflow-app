import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponentComponent } from './dashboard-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideToastr } from 'ngx-toastr';

describe('DashboardComponentComponent', () => {
  let component: DashboardComponentComponent;
  let fixture: ComponentFixture<DashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponentComponent, HttpClientTestingModule],
      providers: [
        provideToastr(),
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

    fixture = TestBed.createComponent(DashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
