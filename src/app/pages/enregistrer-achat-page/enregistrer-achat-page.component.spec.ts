import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerAchatPageComponent } from './enregistrer-achat-page.component';

describe('EnregistrerAchatPageComponent', () => {
  let component: EnregistrerAchatPageComponent;
  let fixture: ComponentFixture<EnregistrerAchatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerAchatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerAchatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
