import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoDeUsoComponent } from './termo-de-uso.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TermoDeUsoComponent', () => {
  let component: TermoDeUsoComponent;
  let fixture: ComponentFixture<TermoDeUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermoDeUsoComponent, HttpClientTestingModule]
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
