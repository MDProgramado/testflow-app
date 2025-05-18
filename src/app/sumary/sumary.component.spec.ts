import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryComponent } from './sumary.component';

describe('SumaryComponent', () => {
  let component: SumaryComponent;
  let fixture: ComponentFixture<SumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumaryComponent]
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
