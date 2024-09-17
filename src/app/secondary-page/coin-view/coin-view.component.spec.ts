import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinViewComponent } from './coin-view.component';

describe('CoinViewComponent', () => {
  let component: CoinViewComponent;
  let fixture: ComponentFixture<CoinViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
