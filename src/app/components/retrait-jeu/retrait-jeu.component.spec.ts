import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitJeuComponent } from './retrait-jeu.component';

describe('RetraitJeuComponent', () => {
  let component: RetraitJeuComponent;
  let fixture: ComponentFixture<RetraitJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetraitJeuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetraitJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
