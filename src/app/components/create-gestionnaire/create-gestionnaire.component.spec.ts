import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGestionnaireComponent } from './create-gestionnaire.component';

describe('CreateGestionnaireComponent', () => {
  let component: CreateGestionnaireComponent;
  let fixture: ComponentFixture<CreateGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGestionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
