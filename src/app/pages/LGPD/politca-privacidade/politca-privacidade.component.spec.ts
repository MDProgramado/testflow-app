import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitcaPrivacidadeComponent } from './politca-privacidade.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PolitcaPrivacidadeComponent', () => {
  let component: PolitcaPrivacidadeComponent;
  let fixture: ComponentFixture<PolitcaPrivacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitcaPrivacidadeComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitcaPrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
