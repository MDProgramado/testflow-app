import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatonComponent } from './notificaton.component';

describe('NotificatonComponent', () => {
  let component: NotificatonComponent;
  let fixture: ComponentFixture<NotificatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
