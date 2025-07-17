import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginUserComponentComponent } from './login-user-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';


describe('LoginUserComponentComponent', () => {
  let component: LoginUserComponentComponent;
  let fixture: ComponentFixture<LoginUserComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserComponentComponent, HttpClientTestingModule, ToastrModule.forRoot()],
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

    fixture = TestBed.createComponent(LoginUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
