import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersoComponent } from './info-perso.component';

describe('InfoPersoComponent', () => {
  let component: InfoPersoComponent;
  let fixture: ComponentFixture<InfoPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
