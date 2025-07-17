import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryComponent } from './sumary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SumaryComponent', () => {
  let component: SumaryComponent;
  let fixture: ComponentFixture<SumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumaryComponent, HttpClientTestingModule],
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

    fixture = TestBed.createComponent(SumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
