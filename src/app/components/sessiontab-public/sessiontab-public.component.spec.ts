import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessiontabPublicComponent } from './sessiontab-public.component';

describe('SessiontabPublicComponent', () => {
  let component: SessiontabPublicComponent;
  let fixture: ComponentFixture<SessiontabPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessiontabPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessiontabPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
