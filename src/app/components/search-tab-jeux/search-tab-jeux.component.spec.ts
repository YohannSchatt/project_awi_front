import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabJeuxComponent } from './search-tab-jeux.component';

describe('SearchTabJeuxComponent', () => {
  let component: SearchTabJeuxComponent;
  let fixture: ComponentFixture<SearchTabJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTabJeuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTabJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
