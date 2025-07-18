import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponentComponent } from './footer-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FooterComponentComponent', () => {
  let component: FooterComponentComponent;
  let fixture: ComponentFixture<FooterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponentComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
