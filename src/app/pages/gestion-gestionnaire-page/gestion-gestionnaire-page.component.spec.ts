import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGestionnairePageComponent } from './gestion-gestionnaire-page.component';

describe('GestionGestionnairePageComponent', () => {
  let component: GestionGestionnairePageComponent;
  let fixture: ComponentFixture<GestionGestionnairePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGestionnairePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGestionnairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
