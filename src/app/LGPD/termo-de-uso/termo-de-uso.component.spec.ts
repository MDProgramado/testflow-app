import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoDeUsoComponent } from './termo-de-uso.component';

describe('TermoDeUsoComponent', () => {
  let component: TermoDeUsoComponent;
  let fixture: ComponentFixture<TermoDeUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermoDeUsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
