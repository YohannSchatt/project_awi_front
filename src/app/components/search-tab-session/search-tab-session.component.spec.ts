import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabSessionComponent } from './search-tab-session.component';

describe('SearchTabSessionComponent', () => {
  let component: SearchTabSessionComponent;
  let fixture: ComponentFixture<SearchTabSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTabSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTabSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
