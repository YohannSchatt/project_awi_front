import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitPageComponent } from './retrait-page.component';

describe('RetraitPageComponent', () => {
  let component: RetraitPageComponent;
  let fixture: ComponentFixture<RetraitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetraitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetraitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
