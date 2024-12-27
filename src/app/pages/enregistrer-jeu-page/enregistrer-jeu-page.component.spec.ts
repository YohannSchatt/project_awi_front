import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerJeuPageComponent } from './enregistrer-jeu-page.component';

describe('EnregistrerJeuPageComponent', () => {
  let component: EnregistrerJeuPageComponent;
  let fixture: ComponentFixture<EnregistrerJeuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerJeuPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerJeuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
