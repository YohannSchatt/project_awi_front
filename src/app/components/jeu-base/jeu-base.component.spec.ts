import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuBaseComponent } from './jeu-base.component';

describe('JeuBaseComponent', () => {
  let component: JeuBaseComponent;
  let fixture: ComponentFixture<JeuBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
