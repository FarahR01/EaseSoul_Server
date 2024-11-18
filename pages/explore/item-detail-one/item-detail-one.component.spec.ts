import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailOneComponent } from './item-detail-one.component';

describe('ItemDetailOneComponent', () => {
  let component: ItemDetailOneComponent;
  let fixture: ComponentFixture<ItemDetailOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDetailOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
