import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabVendeurComponent } from './search-tab-vendeur.component';

describe('SearchTabVendeurComponent', () => {
  let component: SearchTabVendeurComponent;
  let fixture: ComponentFixture<SearchTabVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTabVendeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTabVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
