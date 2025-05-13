import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserComponentComponent } from './login-user-component.component';

describe('LoginUserComponentComponent', () => {
  let component: LoginUserComponentComponent;
  let fixture: ComponentFixture<LoginUserComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserComponentComponent]
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
