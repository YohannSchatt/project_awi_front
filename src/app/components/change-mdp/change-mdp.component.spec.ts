import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMdpComponent } from './change-mdp.component';

describe('ChangeMdpComponent', () => {
  let component: ChangeMdpComponent;
  let fixture: ComponentFixture<ChangeMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeMdpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
