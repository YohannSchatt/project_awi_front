import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxUnitaireComponent } from './jeux-unitaire.component';

describe('JeuxUnitaireComponent', () => {
  let component: JeuxUnitaireComponent;
  let fixture: ComponentFixture<JeuxUnitaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuxUnitaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxUnitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
