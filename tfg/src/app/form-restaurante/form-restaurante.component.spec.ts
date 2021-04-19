import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRestauranteComponent } from './form-restaurante.component';

describe('FormRestauranteComponent', () => {
  let component: FormRestauranteComponent;
  let fixture: ComponentFixture<FormRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
