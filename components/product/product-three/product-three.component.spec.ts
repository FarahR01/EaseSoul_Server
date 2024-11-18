import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductThreeComponent } from './product-three.component';

describe('ProductThreeComponent', () => {
  let component: ProductThreeComponent;
  let fixture: ComponentFixture<ProductThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
