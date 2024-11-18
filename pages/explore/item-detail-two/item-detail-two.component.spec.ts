import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailTwoComponent } from './item-detail-two.component';

describe('ItemDetailTwoComponent', () => {
  let component: ItemDetailTwoComponent;
  let fixture: ComponentFixture<ItemDetailTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDetailTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
