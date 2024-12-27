import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestionPageComponent } from './home-gestion-page.component';

describe('HomeGestionPageComponent', () => {
  let component: HomeGestionPageComponent;
  let fixture: ComponentFixture<HomeGestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGestionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
