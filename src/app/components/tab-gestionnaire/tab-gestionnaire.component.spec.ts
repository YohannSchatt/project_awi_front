import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGestionnaireComponent } from './tab-gestionnaire.component';

describe('TabGestionnaireComponent', () => {
  let component: TabGestionnaireComponent;
  let fixture: ComponentFixture<TabGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGestionnaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
