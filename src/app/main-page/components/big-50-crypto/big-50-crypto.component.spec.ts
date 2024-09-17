import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Big50CryptoComponent } from './big-50-crypto.component';

describe('Big50CryptoComponent', () => {
  let component: Big50CryptoComponent;
  let fixture: ComponentFixture<Big50CryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Big50CryptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Big50CryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
